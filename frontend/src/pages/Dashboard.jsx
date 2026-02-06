import { useApp } from "../context/AppContext";
import { SummaryCard } from "../components/SummaryCard";
import { ExpenseChart } from "../components/ExpenseChart";
import { TrendsChart } from "../components/TrendsChart";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";

export const Dashboard = () => {
  const { expenses } = useApp();

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = 150000; // Mock fixed income for demo purposes
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Dashboard</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--muted)] transition-colors">
            Download Report
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors">
            New Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Total Balance" amount={balance} type="balance" trend={+2.5} />
        <SummaryCard title="Monthly Income" amount={totalIncome} type="income" trend={+0.0} />
        <SummaryCard title="Total Expenses" amount={totalExpense} type="expense" trend={-4.2} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1">
          <ExpenseChart />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <TrendsChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-1">
          <ExpenseForm />
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-[var(--card)] p-3 rounded-2xl border border-[var(--border)] card-shadow">
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-medium bg-[var(--primary)] text-white rounded-lg">All</button>
              <button className="px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors">Income</button>
              <button className="px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors">Expense</button>
            </div>
            <select className="bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm rounded-lg focus:ring-[var(--primary)] px-3 py-1.5">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <ExpenseList limit={5} />
        </div>
      </div>
      
    </div>
  );
};
