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

interface QRAnalyticsChartProps {
  data: Array<{
    date: string;
    qrCodeScans: number;
  }>;
}

export function QRAnalyticsChart({ data = [] }: QRAnalyticsChartProps) {
  const locale = useLocale();
  const t = useTranslations("QR");
  
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
          name={t("totalScans")}
          dataKey="qrCodeScans"
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dot={{ fill: "#3b82f6" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
