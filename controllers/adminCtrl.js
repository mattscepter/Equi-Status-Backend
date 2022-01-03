const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const db=require("../lib/db.js");
require("dotenv").config();
const uuid=require('uuid');


const adminCtrl={
    register:(req,res)=>{
        
         db.query(
            `SELECT * FROM credential WHERE email = ${db.escape(
              req.body.email
            )}`,(err,result)=>{
                if(result.length){
                    return res.status(409).json("This user is already in user!")
                }
                else{
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(err){
                            return res.status(500).json({msg:err});
                        }
                        
                        else{
                           db.query(`INSERT INTO credential (id,name,phone,email,password) VALUES ('${uuid.v4()}',${db.escape(
                            req.body.name
                          )},${db.escape(req.body.phone)},${db.escape(req.body.email)}, "${hash}")`,(err,result)=>{
                              if(err){
                                  throw err;
                                  return res.status(400).json({
                                      msg:err,
                                  })
                              }
                             return res.status(200).json({
                                 msg:"Registered !"
                             })
                          }) 
                        }
                    })
                }
            });

    },
    login:(req,res)=>{
       db.query(`SELECT * FROM credential WHERE email = ${db.escape(req.body.email)}`,(err,result)=>{
           if(err){
               throw err;
               return res.status(400).json({
                   msg:err
               })
           }
           if(!result.length){
               return res.status(400).json({
                   msg:"Email or password is incorrect!"
               })
           }
           bcrypt.compare(req.body.password,result[0]['password'],(bErr,bResult)=>{
            if (bErr) {
                throw bErr;
                return res.status(401).send({
                  msg: 'Email or password is incorrect!'
                });
              }
              if(bResult){
                  const token=jwt.sign({
                      id:result[0].id
                  },'equi-status-utkarsh-ayush',{
                        expiresIn: '7d'
                  });

                  const refresh_token=jwt.sign({
                    id:result[0].id
                },'equi-status-shyam',{
                      expiresIn: '30d'
                });

                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/api/refresh_token',
                    maxAge: 30*24*60*60*1000 // 30days
                });
  

                  return res.status(200).send({
                    msg: 'Logged in!',
                    token,
                    user: result[0]
                  });                
              }

              return res.status(401).send({
                msg: 'Email or password is incorrect!'
              });
           })
       })
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'});
            return res.json({msg: "Logged out!"});
            } catch (error) {
              return res.status(500).json({msg: error.message});
            }
    },
    generateAccessToken:(req,res)=>{
        const rf_token = req.cookies.refreshtoken;

        if(!rf_token) return res.status(403).json({msg: "Please login now."})

        jwt.verify(rf_token, 'equi-status-shyam', (err, result) => {
            db.query(`SELECT * FROM credential WHERE id = ${db.escape(result[0].id)}`,(err,result)=>{
                if(!result) return res.status(405).json({msg: "This does not exist."})
      
                const token=jwt.sign({
                    id:result[0].id
                },'equi-status-utkarsh-ayush',{
                      expiresIn: '7d'
                });
 
                
            res.status(200).json({
                token,
                result
            })
            })


        })
       
    },
    
    logout:(req,res)=>{
        try {
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'});
        return res.json({msg: "Logged out!"});
        } catch (error) {
          return res.status(500).json({msg: error.message});
        }
    }

}

module.exports=adminCtrl;
