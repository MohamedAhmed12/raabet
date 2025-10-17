export interface ChartData {
  date: string;
  profileViews: number;
  blockClicks: number;
  socialClicks: number;
}

export interface BlockInteractionData {
  type: string;
  title: string;
  views: number;
  created_at: Date;
  _count?: { analytics: number };
  analytics?: any[];
}

export interface SocialClickData {
  type: string;
  url: string;
  _count?: { analytics: number };
}

export const exportAnalyticsToCSV = (
  chartData: ChartData[],
  filename?: string
) => {
  // Create CSV content
  const csvHeader = "Date,Profile Views,Block Clicks,Social Clicks\n";

  // Generate CSV rows from chartData
  const csvRows = chartData
    .map((item) => {
      const date = new Date(item.date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      return `${date},${item.profileViews},${item.blockClicks},${item.socialClicks}`;
    })
    .join("\n");

  const csvContent = csvHeader + csvRows;

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename || `analytics-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportBlockInteractionsToCSV = (
  data: BlockInteractionData[],
  profileViews: number,
  filename?: string
) => {
  const csvHeader = "Type,Name,Clicks,Views,Added,\n";

  const csvRows = data
    .map((item) => {
      return `${item.type},${item.title},${
        item?._count?.analytics || 0
      },${profileViews},${new Date(item.created_at).toLocaleDateString()}`;
    })
    .join("\n");

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename ||
      `block-interactions-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSocialClicksToCSV = (
  data: SocialClickData[],
  filename?: string
) => {
  const csvHeader = "Type,URL,Clicks\n";

  const csvRows = data
    .map((item) => {
      return `${item.type},${item.url},${item._count?.analytics || 0}`;
    })
    .join("\n");

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename || `social-clicks-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
