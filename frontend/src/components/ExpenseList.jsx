import { useState } from "react";
import { useApp } from "../context/AppContext";
import { format, parseISO } from "date-fns";
import { Edit2, Trash2, Tag, Utensils, Car, Film, Zap, FileText, X } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { cn } from "../utils/cn";

const iconMap = {
  Tag: Tag,
  Utensils: Utensils,
  Car: Car,
  Film: Film,
  Zap: Zap,
};

export const ExpenseList = ({ limit, expenses: propExpenses }) => {
  const { expenses: contextExpenses, categories, updateExpense, deleteExpense } = useApp();
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deletedIds, setDeletedIds] = useState(new Set());

  const expenses = propExpenses || contextExpenses;

  const getCategory = (id) => categories.find((c) => c.id === id) || { name: "Uncategorized", color: "#94A3B8", icon: "Tag" };

  const activeExpenses = expenses.filter(e => !deletedIds.has(e.id));
  const displayExpenses = limit ? activeExpenses.slice(0, limit) : activeExpenses;

  const handleDelete = () => {
    if (deletingId) {
      setDeletedIds(new Set([...deletedIds, deletingId]));
      setTimeout(() => {
        deleteExpense(deletingId);
      }, 300); // Allow exit animation
      setDeletingId(null);
    }
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    updateExpense(editingExpense.id, {
      title: editingExpense.title,
      amount: parseFloat(editingExpense.amount),
      categoryId: editingExpense.categoryId
    });
    setEditingExpense(null);
  };

  if (displayExpenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[var(--card)] rounded-2xl border border-[var(--border)] card-shadow">
        <div className="h-16 w-16 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
          <FileText className="text-[var(--muted-foreground)]" size={32} />
        </div>
        <p className="text-[var(--foreground)] font-medium">No expenses found</p>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">Add a new expense to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] card-shadow">
      <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {displayExpenses.map((expense) => {
          const category = getCategory(expense.categoryId);
          const Icon = iconMap[category.icon] || Tag;

          const isBeingDeleted = deletedIds.has(expense.id);
          return (
            <div 
              key={expense.id} 
              className={cn(
                "flex items-center justify-between px-6 py-4 hover:bg-[var(--muted)]/50 transition-all duration-300 group",
                isBeingDeleted ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)] truncate">{expense.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                      {category.name}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {format(parseISO(expense.date), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <p className="font-semibold text-[var(--foreground)]">
                  -₹{expense.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setEditingExpense(expense)}
                    className="p-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setDeletingId(expense.id)}
                    className="p-2 rounded-full text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />

      {editingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[var(--card)] p-6 shadow-2xl card-shadow border border-[var(--border)] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--foreground)]">Edit Expense</h2>
              <button onClick={() => setEditingExpense(null)} className="rounded-full p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingExpense.title}
                  onChange={(e) => setEditingExpense({ ...editingExpense, title: e.target.value })}
                  className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--muted-foreground)]">₹</span>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={editingExpense.amount}
                    onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
                    className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-8 px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Category</label>
                <select
                  value={editingExpense.categoryId}
                  onChange={(e) => setEditingExpense({ ...editingExpense, categoryId: e.target.value })}
                  className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
