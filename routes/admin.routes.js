const express = require("express");
const { AdminModel } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();

adminRouter.get("/", async (req, res) => {
  try {
    let data = await AdminModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
adminRouter.post("/register", async (req, res) => {
  const {email,pass,name} = req.body;
  try {
    bcrypt.hash(pass, 5,async (err, secured_password)=> {
      // Store hash in your password DB.
      if(err){
        console.log(err);
      }else{

        const user = new AdminModel({email,pass:secured_password,name});
        await user.save();
        res.send("Registered");
      }
  });
  } catch (error) {
    res.send("error in registering the user");
    console.log(error);
  }
});
adminRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await AdminModel.find({ email });
    console.log(user);    
    const hashed_pass=user[0].pass
    if (user.length > 0) {
      bcrypt.compare(pass, hashed_pass , (err, result)=> {
        if(result){
        const token = jwt.sign({ adminID:user[0]._id}, "masai");
        res.send({ "msg": "Login Successful", "token": token});
      }else{
        res.send({"msg":"wrong credentials"});
      }
      });

    } else {
      res.send({"msg":"wrong credentials"});
    }
  } catch (error) {
    res.send({"msg":"wrong credentials"});
    console.log(error);
  }
});

adminRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await AdminModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "you are not authorised" });
    } else {
      await AdminModel.findByIdAndDelete({ _id: id });
      res.send("deleted the note");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { adminRouter };
