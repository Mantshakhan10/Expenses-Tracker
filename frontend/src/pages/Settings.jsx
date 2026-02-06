import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Settings as SettingsIcon, Bell, Palette, Tag, User, Shield, CreditCard, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

export const Settings = () => {
  const { theme, toggleTheme, categories, logout } = useApp();
  const [activeTab, setActiveTab] = useState("categories");

  const sidebarLinks = [
    { id: "account", label: "Account", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <aside className="w-full md:w-64 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">Settings</h2>
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === link.id 
                    ? "bg-[var(--primary)] text-white shadow-sm" 
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                <Icon size={18} />
                {link.label}
              </button>
            );
          })}
          <hr className="my-2 border-[var(--border)] hidden md:block" />
          <button onClick={logout} className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors">
            <LogOut size={18} />
            Sign out
          </button>
        </nav>
      </aside>

      <div className="flex-1 max-w-3xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 card-shadow">
          
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Expense Categories</h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage categories for organizing your expenses.</p>
              </div>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-[var(--foreground)]">{cat.name}</span>
                    </div>
                    <button className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                      Edit
                    </button>
                  </div>
                ))}
                <button className="w-full flex justify-center items-center py-4 rounded-xl border border-dashed border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm font-medium">
                  + Add New Category
                </button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Appearance</h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Customize the look and feel of your dashboard.</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <div>
                  <p className="font-medium text-[var(--foreground)]">Dark Mode</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Switch between light and dark themes.</p>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={cn(
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]",
                    theme === "dark" ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                  )}
                >
                  <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out", theme === "dark" ? "translate-x-5" : "translate-x-0")} />
                </button>
              </div>
            </div>
          )}

          {activeTab !== "categories" && activeTab !== "appearance" && (
            <div className="text-center py-12">
              <SettingsIcon className="mx-auto h-12 w-12 text-[var(--muted-foreground)]/50" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)] capitalize">{activeTab} Settings</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
