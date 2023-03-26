const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  title: String,
  type: String,
  description: String,
  assignedTo: String,
});
const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };
