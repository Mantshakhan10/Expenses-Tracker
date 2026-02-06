import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const defaultCategories = [
  { id: "cat-1", name: "General", color: "#64748B", icon: "Tag" },
  { id: "cat-2", name: "Food & Dining", color: "#F59E0B", icon: "Utensils" },
  { id: "cat-3", name: "Transportation", color: "#3B82F6", icon: "Car" },
  { id: "cat-4", name: "Entertainment", color: "#8B5CF6", icon: "Film" },
  { id: "cat-5", name: "Bills & Utilities", color: "#EF4444", icon: "Zap" },
];

const mockExpenses = [
  { id: uuidv4(), title: "Groceries", amount: 2500, categoryId: "cat-2", date: new Date().toISOString() },
  { id: uuidv4(), title: "Uber to Office", amount: 450, categoryId: "cat-3", date: new Date(Date.now() - 86400000).toISOString() },
  { id: uuidv4(), title: "Netflix Subscription", amount: 649, categoryId: "cat-4", date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: uuidv4(), title: "Electricity Bill", amount: 1200, categoryId: "cat-5", date: new Date(Date.now() - 86400000 * 5).toISOString() },
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ name: "Jane Doe", email: "jane@example.com" });
  
  const [expenses, setExpenses] = useState(mockExpenses);
  const [categories, setCategories] = useState(defaultCategories);
  const [budgets, setBudgets] = useState([
    { id: "bud-1", categoryId: "cat-2", limit: 5000 },
    { id: "bud-2", categoryId: "cat-3", limit: 2000 },
  ]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  
  const login = (email, password) => {
    setUser({ name: "Jane Doe", email });
  };
  
  const logout = () => setUser(null);

  const addExpense = (expenseData) => {
    setExpenses([{ id: uuidv4(), ...expenseData }, ...expenses]);
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const addCategory = (catData) => {
    setCategories([...categories, { id: uuidv4(), ...catData }]);
  };

  const setBudget = (categoryId, limit) => {
    const existing = budgets.find(b => b.categoryId === categoryId);
    if (existing) {
      setBudgets(budgets.map(b => b.categoryId === categoryId ? { ...b, limit } : b));
    } else {
      setBudgets([...budgets, { id: uuidv4(), categoryId, limit }]);
    }
  };

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter(e => {
      const d = parseISO(e.date);
      return isWithinInterval(d, { start: startDate, end: endDate });
    });
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      user, login, logout,
      expenses, addExpense, updateExpense, deleteExpense, getExpensesByDateRange,
      categories, addCategory,
      budgets, setBudget
    }}>
      {children}
    </AppContext.Provider>
  );
};
