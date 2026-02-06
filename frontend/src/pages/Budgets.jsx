import { useApp } from "../context/AppContext";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";

export const Budgets = () => {
  const { budgets, expenses, categories } = useApp();

  const getCategory = (id) => categories.find((c) => c.id === id) || { name: "Unknown", color: "#94A3B8" };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Budgets</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage limits and keep your spending on track.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors">
          <PlusCircle size={18} />
          Create Budget
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {budgets.map((budget) => {
          const category = getCategory(budget.categoryId);
          const spent = expenses
            .filter((e) => e.categoryId === budget.categoryId)
            .reduce((sum, e) => sum + e.amount, 0);
          
          const percentage = Math.min((spent / budget.limit) * 100, 100);
          const isWarning = percentage >= 80 && percentage < 100;
          const isDanger = percentage >= 100;

          const progressColor = isDanger ? "var(--destructive)" : isWarning ? "#F59E0B" : "var(--primary)";

          return (
            <div key={budget.id} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow transition-shadow hover:shadow-md group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <h3 className="font-semibold text-[var(--foreground)] text-lg">{category.name}</h3>
                </div>
                {isDanger && (
                  <span className="flex items-center gap-1 text-xs font-medium text-[var(--destructive)] bg-[var(--destructive)]/10 px-2 py-1 rounded-full">
                    <AlertTriangle size={14} />
                    Exceeded
                  </span>
                )}
                {isWarning && (
                  <span className="flex items-center gap-1 text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-full">
                    Near Limit
                  </span>
                )}
              </div>

              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">₹{spent.toLocaleString()}</p>
                  <p className="text-sm font-medium text-[var(--muted-foreground)] mt-1">
                    of ₹{budget.limit.toLocaleString()} limit
                  </p>
                </div>
                <p className="text-sm font-semibold" style={{ color: progressColor }}>
                  {percentage.toFixed(0)}%
                </p>
              </div>

              <div className="h-3 w-full rounded-full bg-[var(--muted)] overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%`, backgroundColor: progressColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
