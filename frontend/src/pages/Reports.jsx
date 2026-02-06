import { useState } from "react";
import { useApp } from "../context/AppContext";
import { ExportModal } from "../components/ExportModal";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";
import { ExpenseChart } from "../components/ExpenseChart";
import { TrendsChart } from "../components/TrendsChart";

export const Reports = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { expenses } = useApp();

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Reports & Analytics</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Detailed insights into your spending patterns.</p>
        </div>
        <button 
          onClick={() => setIsExportOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
        >
          <Download size={18} />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Transactions</p>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">{expenses.length}</h3>
          </div>
        </div>
        
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--destructive)]/10 text-[var(--destructive)]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Highest Expense</p>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">
              ₹{Math.max(...expenses.map(e => e.amount), 0).toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--success)]/10 text-[var(--success)]">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Average Daily</p>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">
              ₹{(totalExpense / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpenseChart />
        <TrendsChart />
      </div>

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
};
