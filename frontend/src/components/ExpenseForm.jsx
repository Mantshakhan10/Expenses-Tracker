import { useState } from "react";
import { useApp } from "../context/AppContext";
import { PlusCircle, Loader2 } from "lucide-react";

export const ExpenseForm = () => {
  const { categories, addExpense } = useApp();
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    setIsLoading(true);

    setTimeout(() => {
      addExpense({
        title,
        amount: parseFloat(amount),
        categoryId: categoryId || categories.find(c => c.name === "General")?.id || categories[0].id,
        date: new Date().toISOString(),
      });
      setTitle("");
      setAmount("");
      setCategoryId("");
      setIsLoading(false);
    }, 600); // Simulate API latency
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow h-[400px] flex flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
          <PlusCircle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">Quick Expense</h3>
          <p className="text-sm text-[var(--muted-foreground)]">Add a new transaction instantly.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 justify-center">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
            placeholder="e.g., Starbucks Coffee"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Amount</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--muted-foreground)]">₹</span>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-8 px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Split With</label>
            <select className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow cursor-pointer">
              <option value="none">Just Me</option>
              <option value="alex">Alex (50/50)</option>
              <option value="group">Roommates (Custom)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow appearance-none cursor-pointer"
            >
              <option value="">Default (General)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading || !title || !amount}
            className="w-full flex items-center justify-center rounded-xl bg-[var(--primary)] py-3 px-4 text-sm font-medium text-white shadow-md hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};
