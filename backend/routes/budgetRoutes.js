// routes/budgetRoutes.js
const router = require("express").Router();
const Budget = require("../models/Budget");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const budgets = await Budget.find({ userId: req.userId });
  res.json(budgets);
});

router.post("/", auth, async (req, res) => {
  const budget = await Budget.create({
    ...req.body,
    userId: req.userId,
  });
  res.json(budget);
});

router.delete("/:id", auth, async (req, res) => {
  await Budget.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
