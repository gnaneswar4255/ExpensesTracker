// routes/expenses.js
const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth'); // ✅ required for protected route

const router = express.Router();

// ➕ Add new expense (protected)
router.post('/', auth, async (req, res) => {
  const { title, amount, category } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newExpense = new Expense({
      title,
      amount,
      category,
      user: req.user, // ✅ linked to logged-in user
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📥 Get expenses (protected)
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE expense by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
