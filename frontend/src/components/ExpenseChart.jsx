import { useApp } from "../context/AppContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const ExpenseChart = () => {
  const { expenses, categories, theme } = useApp();

  const data = categories
    .map((cat) => {
      const total = expenses
        .filter((e) => e.categoryId === cat.id)
        .reduce((acc, curr) => acc + curr.amount, 0);

      return {
        name: cat.name,
        value: total,
        color: cat.color,
      };
    })
    .filter((item) => item.value > 0);

  const totalExpense = data.reduce((acc, curr) => acc + curr.value, 0);

  /* ================= EMPTY STATE ================= */
  if (data.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] card-shadow">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">
          No expense data to chart
        </p>
      </div>
    );
  }

  /* ================= CHART ================= */
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow">
      <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
        Expenses by Category
      </h3>

      {/* 🔥 FIXED HEIGHT CONTAINER (VERY IMPORTANT) */}
      <div style={{ width: "100%", height: 300, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#001F26" : "#FFFFFF",
                borderColor: theme === "dark" ? "#003642" : "#E2E8F0",
                color: theme === "dark" ? "#F8FAFC" : "#1E293B",
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TOTAL */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-[var(--muted-foreground)]">
            Total
          </span>
          <span className="text-2xl font-bold text-[var(--foreground)]">
            ₹{totalExpense.toLocaleString()}
          </span>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span
              className="truncate text-[var(--muted-foreground)]"
              title={item.name}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
