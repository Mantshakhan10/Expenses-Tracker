import { X, AlertTriangle } from "lucide-react";

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--card)] p-6 shadow-2xl card-shadow border border-[var(--border)] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-[var(--destructive)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--destructive)]/10">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">{title}</h2>
          </div>
          <button onClick={onCancel} className="rounded-full p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90 transition-colors shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
