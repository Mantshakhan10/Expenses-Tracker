import { useApp } from "../context/AppContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, parseISO } from "date-fns";

export const TrendsChart = () => {
  const { expenses, theme } = useApp();

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStr = format(date, "MMM dd");
      const total = expenses
        .filter(
          (e) => format(parseISO(e.date), "MMM dd") === dayStr
        )
        .reduce((sum, e) => sum + e.amount, 0);

      days.push({ name: dayStr, amount: total });
    }
    return days;
  };

  const data = getLast7Days();

  return (
    <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Spending Trends
        </h3>

        <select className="bg-[var(--background)] border border-[var(--border)] text-sm rounded-lg p-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* 🔥 FIXED HEIGHT CONTAINER */}
      <div
        className="relative w-full"
        style={{ height: 280, minHeight: 280 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme === "dark" ? "#003642" : "#E2E8F0"}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(v) => `₹${v}`}
            />

            <Tooltip
              formatter={(v) => [`₹${v}`, "Amount"]}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#001F26" : "#FFFFFF",
                borderColor: theme === "dark" ? "#003642" : "#E2E8F0",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#colorAmount)"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
