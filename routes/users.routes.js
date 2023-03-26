// const { application } = require("express");
const express = require("express");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const query = req.query.device;
  try {
    let data = await UserModel.find({ device: query });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newpost = new UserModel(payload);
    await newpost.save();
    res.send("added new employee successfully");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});
userRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await UserModel.findOne({ _id: id });
  const useridpost = post.userID;
  const useridrequesting = req.body.userID;
  try {
    if (useridrequesting !== useridpost) {
      res.send({ msg: "you are not authorized" });
    } else {
      await UserModel.findOneAndUpdate({ _id: id }, payload);
      res.send("updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await UserModel.findOne({ _id: id });
  const useridpost = post.userID;
  const useridrequesting = req.body.userID;
  try {
    if (useridrequesting !== useridpost) {
      res.send({ msg: "you are not authorized" });
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});

module.exports = { userRouter };
