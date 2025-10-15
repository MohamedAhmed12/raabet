"use client";

import { cn } from "@/lib/cn";
import { useLocale, useTranslations } from "next-intl";
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

interface ProfileAnalyticsChartProps {
  data: Array<{
    date: string;
    profileViews: number;
    blockClicks: number;
    socialClicks: number;
  }>;
}

export const ProfileAnalyticsChart = ({
  data = [],
}: ProfileAnalyticsChartProps) => {
  const locale = useLocale();
  const t = useTranslations("Analytics.Metrics.profile");

  return (
    <ResponsiveContainer width="100%" height={300} className="mb-5 space-y-3">
      <LineChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis width={60} tickMargin={10} />
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
          name={t("profileViews")}
          dataKey="profileViews"
          stroke="#50bd81"
          activeDot={{ r: 8 }}
          dot={{ fill: "#50bd81" }}
        />
        <Line
          type="monotone"
          name={t("blockClicks")}
          dataKey="blockClicks"
          stroke="#ebb46c"
          activeDot={{ r: 8 }}
          dot={{ fill: "#ebb46c" }}
        />
        <Line
          type="monotone"
          name={t("socialClicks")}
          dataKey="socialClicks"
          stroke="#097cd4"
          activeDot={{ r: 8 }}
          dot={{ fill: "#097cd4" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
