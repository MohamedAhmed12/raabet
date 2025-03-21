import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { date: "03/01/2025", profileViews: 1, blockClicks: 0, socialClicks: 0 },
  { date: "03/02/2025", profileViews: 2, blockClicks: 1, socialClicks: 0 },
  { date: "03/03/2025", profileViews: 3, blockClicks: 0, socialClicks: 1 },
  { date: "03/04/2025", profileViews: 4, blockClicks: 1, socialClicks: 2 },
];

export const ProfileAnalyticsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300} className="mb-5 space-y-3">
      <LineChart data={chartData} style={{ padding: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="ffff" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ paddingTop: 15 }} />
        <Line
          type="monotone"
          dataKey="profileViews"
          stroke="#50bd81"
          activeDot={{ r: 8 }}
          dot={{ fill: "#50bd81" }}
        />
        <Line
          type="monotone"
          dataKey="blockClicks"
          stroke="#ebb46c"
          activeDot={{ r: 8 }}
          dot={{ fill: "#ebb46c" }}
        />
        <Line
          type="monotone"
          dataKey="socialClicks"
          stroke="#097cd4"
          activeDot={{ r: 8 }}
          dot={{ fill: "#097cd4" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
