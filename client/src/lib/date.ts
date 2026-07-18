export function formatDate(
  date?: string | Date | null,
  style: "relative" | "absolute" = "absolute",
) {
  if (!date) return "N/A";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "Invalid date";

  if (style === "absolute") {
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const now = new Date();
  const diff = d.getTime() - now.getTime(); // positive = future
  const absDiff = Math.abs(diff);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  const format = (
    value: number,
    unit: "min" | "hr" | "day" | "week" | "month" | "year",
    future: boolean,
  ) =>
    future
      ? `In ${value} ${unit}${value > 1 ? "s" : ""}`
      : `${value} ${unit}${value > 1 ? "s" : ""} ago`;

  // Future dates
  if (diff > 0) {
    if (diff < minute) return "In a moment";
    if (diff < hour) return format(Math.floor(diff / minute), "min", true);
    if (diff < day) return format(Math.floor(diff / hour), "hr", true);
    if (diff < week) return format(Math.floor(diff / day), "day", true);
    if (diff < month) return format(Math.floor(diff / week), "week", true);
    if (diff < year) return format(Math.floor(diff / month), "month", true);

    return format(Math.floor(diff / year), "year", true);
  }

  // Past dates
  if (absDiff < minute) return "Just now";
  if (absDiff < hour) return format(Math.floor(absDiff / minute), "min", false);
  if (absDiff < day) return format(Math.floor(absDiff / hour), "hr", false);
  if (absDiff < week) return format(Math.floor(absDiff / day), "day", false);
  if (absDiff < month)
    return format(Math.floor(absDiff / week), "week", false);
  if (absDiff < year)
    return format(Math.floor(absDiff / month), "month", false);

  return format(Math.floor(absDiff / year), "year", false);
}

