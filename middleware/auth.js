const db=require('../lib/db');
const jwt=require("jsonwebtoken");
require("dotenv").config();


const auth=async(req,res,next)=>{
    try {
        const token=req.header("Authorization");
        
        if(!token)
            return res.status(400).json({msg:"Invalid Authentication"});

            const decoded=jwt.verify(token,'equi-status-utkarsh-ayush');
            // { id: '6108454a3590e9117c98fb9e', iat: 1628141308, exp: 1628227708 } after consoling decoded
         
            if(!decoded){
                return res.status(400).json({msg:"Invalid Authorization"});

            }
            console.log(decoded)
            next();
        
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports=auth;
