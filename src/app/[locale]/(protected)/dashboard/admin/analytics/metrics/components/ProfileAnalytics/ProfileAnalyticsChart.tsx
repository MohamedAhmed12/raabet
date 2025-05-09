import {cn} from "@/lib/cn";
import {useLocale, useTranslations} from "next-intl";
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

export const ProfileAnalyticsChart = () => {
  const locale = useLocale();
  const t = useTranslations("Analytics.Metrics.profile");

  const chartData = [
    {
      date: "03/01/2025",
      [t("profileViews")]: 1,
      [t("blockClicks")]: 0,
      [t("socialClicks")]: 0,
    },
    {
      date: "03/02/2025",
      [t("profileViews")]: 2,
      [t("blockClicks")]: 1,
      [t("socialClicks")]: 0,
    },
    {
      date: "03/03/2025",
      [t("profileViews")]: 3,
      [t("blockClicks")]: 0,
      [t("socialClicks")]: 1,
    },
    {
      date: "03/04/2025",
      [t("profileViews")]: 4,
      [t("blockClicks")]: 1,
      [t("socialClicks")]: 2,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300} className="mb-5 space-y-3">
      <LineChart data={chartData} style={{padding: 5}} className="dsfa">
        <CartesianGrid strokeDasharray="3 3" className="ffff" />
        <XAxis dataKey="date" />
        <YAxis width={10} tickMargin={10} />
        <Tooltip />

        <Legend
          align="center"
          wrapperStyle={{
            paddingTop: 15,
          }}
          formatter={(value) => (
            <span className={cn(locale === "ar" ? "mr-3 ml-10" : "ml-3 mr-10")}>
              {value}
            </span>
          )}
        />

        <Line
          type="monotone"
          dataKey={t("profileViews")}
          stroke="#50bd81"
          activeDot={{r: 8}}
          dot={{fill: "#50bd81"}}
        />
        <Line
          type="monotone"
          dataKey={t("blockClicks")}
          stroke="#ebb46c"
          activeDot={{r: 8}}
          dot={{fill: "#ebb46c"}}
        />
        <Line
          type="monotone"
          dataKey={t("socialClicks")}
          stroke="#097cd4"
          activeDot={{r: 8}}
          dot={{fill: "#097cd4"}}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
