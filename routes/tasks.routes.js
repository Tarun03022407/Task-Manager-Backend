// const { application } = require("express");
const express = require("express");
const { TaskModel } = require("../models/task.model");
const taskRouter = express.Router();

taskRouter.get("/all", async (req, res) => {
  try {
    let tasks = await TaskModel.find();
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
});

taskRouter.get("/:id", async (req, res) => {
  let emp_id = req.params.id;
  try {
    let tasks = await TaskModel.find({ assignedTo: emp_id });
    res.send(tasks);
  } catch (error) {
    console.log(error);
  }
});

taskRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const task = new TaskModel(payload);
    await task.save();
    res.send("added new task successfully");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});
taskRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await TaskModel.findOne({ _id: id });
  const useridpost = post.userID;
  const useridrequesting = req.body.userID;
  try {
    if (useridrequesting !== useridpost) {
      res.send({ msg: "you are not authorized" });
    } else {
      await TaskModel.findOneAndUpdate({ _id: id }, payload);
      res.send("updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});

taskRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await TaskModel.findOne({ _id: id });
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

module.exports = { taskRouter };
