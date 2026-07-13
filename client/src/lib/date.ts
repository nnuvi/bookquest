export function formatDate(
  date?: string | Date | null,
  style: "relative" | "absolute" = "relative",
) {
  if (!date) return "N/A";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "Invalid date";

  if (style === "absolute") {
    return d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
  if (diff < day) return `${Math.floor(diff / hour)} hr ago`;
  if (diff < week)
    return `${Math.floor(diff / day)} day${Math.floor(diff / day) > 1 ? "s" : ""} ago`;
  if (diff < month)
    return `${Math.floor(diff / week)} week${Math.floor(diff / week) > 1 ? "s" : ""} ago`;
  if (diff < year)
    return `${Math.floor(diff / month)} month${Math.floor(diff / month) > 1 ? "s" : ""} ago`;

  return `${Math.floor(diff / year)} year${Math.floor(diff / year) > 1 ? "s" : ""} ago`;
}
