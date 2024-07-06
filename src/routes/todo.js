const express = require("express");
const { Todo, User } = require("../models/User");
const verify = require("./validToken");
const router = express.Router();

router.get("/", verify, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user });
    console.log(todos);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ userId: req.user, _id: id });

    if (!todo) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;

    // let todo = await Todo.findOne({userId:req.user,_id:id});

    // todo = await Todo.findByIdAndUpdate(id, req.body);
    let todo = await Todo.findOneAndUpdate(
      { userId: req.user, _id: id },
      req.body,
      { new: true }
    );

    if (!todo) return res.status(404).send("Item not found");

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    // let todo = await Todo.findOne({userId: req.user,_id:id});
    let todo = await Todo.findOneAndDelete({ userId: req.user, _id: id });

    if (!todo) return res.status(404).json({ message: "Item not found" });
    res.status(200).json("Item Successfully deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", verify, async (req, res) => {
  const todo = new Todo({
    userId: req.user,
    task: req.body.task,
    description: req.body.description,
  });
  try {
    const savedTodo = await todo.save();

    res.status(200).send(savedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
