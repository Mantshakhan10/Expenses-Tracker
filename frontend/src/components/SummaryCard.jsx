import { cn } from "../utils/cn";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

export const SummaryCard = ({ title, amount, type, trend }) => {
  const getIcon = () => {
    switch (type) {
      case "income": return <ArrowUpRight className="text-[var(--success)]" size={24} />;
      case "expense": return <ArrowDownRight className="text-[var(--destructive)]" size={24} />;
      default: return <Wallet className="text-[var(--primary)]" size={24} />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "";
    return trend > 0 ? "text-[var(--success)]" : "text-[var(--destructive)]";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[var(--card)] p-6 shadow-sm card-shadow border border-[var(--border)] transition-all hover:shadow-md group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--muted-foreground)]">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--muted)] group-hover:scale-110 transition-transform duration-300", type === "balance" && "bg-[var(--primary)]/10")}>
          {getIcon()}
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn("font-medium", getTrendColor())}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
          <span className="ml-2 text-[var(--muted-foreground)]">from last month</span>
        </div>
      )}
      
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-10 blur-2xl"></div>
    </div>
  );
};
