import { useState } from "react";
import { X, FileText, Download, Mail } from "lucide-react";
import { cn } from "../utils/cn";

export const ExportModal = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("month");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-[var(--card)] p-6 shadow-2xl card-shadow border border-[var(--border)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Export Report</h2>
          <button onClick={onClose} className="rounded-full p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Format</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setFormat("csv")}
                className={cn("flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all", format === "csv" ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]")}
              >
                <FileText size={18} /> CSV
              </button>
              <button 
                onClick={() => setFormat("pdf")}
                className={cn("flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all", format === "pdf" ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]")}
              >
                <FileText size={18} /> PDF
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-shadow cursor-pointer"
            >
              <option value="month">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--background)] border border-[var(--border)] py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
              <Mail size={18} /> Email Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-3 text-sm font-medium text-white shadow-md hover:bg-[var(--primary-hover)] transition-colors" onClick={onClose}>
              <Download size={18} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
