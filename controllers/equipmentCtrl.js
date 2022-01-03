const db = require("../lib/db.js");
require("dotenv").config();
const uuid = require("uuid");

const path = require("path");
const fs = require("fs");

const equipmentCtrl = {
  addItem: async (req, res) => {
    try {
      const { type, brand, name, description, status } = req.body;

      db.query(
        "INSERT INTO equipment (id,type,brand,name,description,status,image,created_on) VALUES (?,?,?,?,?,?,?,?)",
        [
          `${uuid.v4()}`,
          type,
          brand,
          name,
          description,
          status,
          req.file.filename,
          new Date(),
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            return res.status(200).json({ msg: "Item has been created" });
          }
        }
      );
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  getItem: (req, res) => {
    db.query(
      `SELECT * FROM equipment WHERE id = ${db.escape(req.params.id)}`,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json({
            result: result,
          });
        }
      }
    );
  },
  deleteItem: (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT * FROM equipment WHERE id = ${db.escape(id)}`,
      (err, result) => {
        if (err) {
          throw err;
        } else {
         
         fs.unlink(`./uploads/${result[0].image}`, function (err) {
          console.log(err);
         
          console.log("File deleted!");
        });
        }
      }
    );
    db.query("DELETE FROM equipment WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ result });
      }
    });
  },
  getAll: (req, res) => {
    db.query("SELECT * FROM equipment", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  },
  update: (req, res) => {
    db.query(
      `SELECT * FROM equipment WHERE id = ${db.escape(req.params.id)}`,
      (err, result) => {
        if (err) {
          throw err;
        } else {
         
         fs.unlink(`./uploads/${result[0].image}`, function (err) {
          console.log(err);
         
          console.log("File deleted!");
        });
        }
      }
    );
    const { type, brand, name, description, status } = req.body;
    db.query(
      "UPDATE equipment SET type = ?,brand = ?,name = ?,description = ?,image = ?,status = ? WHERE id = ?",
      [type, brand, name, description,req.file.filename, status, req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  },
  getImage:(req,res)=>{
    const image=req.params.id;

    fs.readFile(`./uploads/${image}`, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
  res.end(data);
    })
  }
};

module.exports = equipmentCtrl;
