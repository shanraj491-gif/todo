const express = require("express");
const Todo = require("../Models/Todo.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = new Todo({ userId: req.user.id, text: req.body.text });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports= router