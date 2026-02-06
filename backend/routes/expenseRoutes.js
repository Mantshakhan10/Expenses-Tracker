const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// /* CREATE EXPENSE */
// router.post("/", auth, async (req, res) => {
//   const { title, amount, category } = req.body;

//   const expense = new Expense({
//     title,
//     amount,
//     category: category || "General",
//     user: req.userId,
//   });

//   await expense.save();
//   res.json(expense);
// });

// /* GET ALL EXPENSES */
// router.get("/", auth, async (req, res) => {
//   const expenses = await Expense.find({
//     user: req.userId,
//   }).sort({ createdAt: -1 });

//   res.json(expenses);
// });

// /* UPDATE EXPENSE */
// router.put("/:id", auth, async (req, res) => {
//   const { title, amount, category } = req.body;

//   const updated = await Expense.findOneAndUpdate(
//     { _id: req.params.id, user: req.userId },
//     {
//       title,
//       amount,
//       category: category || "General",
//     },
//     { new: true }
//   );

//   res.json(updated);
// });

// /* DELETE EXPENSE */
// router.delete("/:id", auth, async (req, res) => {
//   await Expense.findOneAndDelete({
//     _id: req.params.id,
//     user: req.userId,
//   });

//   res.json({ message: "Expense deleted" });
// });

// module.exports = router;
router.post("/", async (req, res) => {
  console.log("🔥 EXPENSE API HIT");
  console.log(req.body);

  const { title, amount, category } = req.body;

  const expense = new Expense({
    title,
    amount,
    category: category || "General",
  });

  await expense.save();

  console.log("✅ SAVED:", expense);
  res.json(expense);
});
