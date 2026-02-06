import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Wallet, LayoutDashboard, ReceiptText, PiggyBank, BarChart3, Settings, LogOut, Sun, Moon, Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";

export const Navbar = () => {
  const { theme, toggleTheme, user, logout } = useApp();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Expenses", path: "/expenses", icon: ReceiptText },
    { name: "Budgets", path: "/budgets", icon: PiggyBank },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white shadow-sm">
                <Wallet size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">Trackr</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      isActive 
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]" 
                        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button className="p-2 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--destructive)] ring-2 ring-[var(--card)]" />
            </button>

            <div className="relative ml-2">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-medium text-sm">
                  {user?.name.charAt(0)}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[var(--card)] py-1 shadow-lg ring-1 ring-[var(--border)] card-shadow focus:outline-none transform opacity-100 scale-100 transition-all origin-top-right z-50">
                  <div className="px-4 py-3 border-b border-[var(--border)]">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">{user?.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Your Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Settings</Link>
                  <button onClick={logout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--destructive)]/10">
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
