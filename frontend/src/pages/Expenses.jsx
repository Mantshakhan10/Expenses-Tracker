import { useState } from "react";
import { useApp } from "../context/AppContext";
import { ExpenseList } from "../components/ExpenseList";
import { Search, Filter, Calendar } from "lucide-react";

export const Expenses = () => {
  const { categories, expenses } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || e.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Transactions</h1>
          <p className="text-[var(--muted-foreground)] mt-1">View and manage all your historical expenses.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 card-shadow flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--muted-foreground)]">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-10 px-4 py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow"
            placeholder="Search transactions..."
          />
        </div>

        <div className="flex gap-4 sm:w-auto overflow-x-auto hide-scrollbar">
          <select className="block rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow cursor-pointer">
            <option>Any Amount</option>
            <option>Under ₹1,000</option>
            <option>₹1,000 - ₹5,000</option>
            <option>Over ₹5,000</option>
          </select>
          
          <div className="relative w-full sm:w-48 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--muted-foreground)]">
              <Filter size={18} />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pl-10 px-4 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors whitespace-nowrap">
            <Calendar size={18} className="text-[var(--muted-foreground)]" />
            <span className="hidden sm:inline">Date Range</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <ExpenseList expenses={filteredExpenses} />
      </div>
    </div>
  );
};
