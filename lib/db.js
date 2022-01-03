const mysql=require("mysql");

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"admin",
    password:"",
})

connection.connect();

module.exports=connection;
