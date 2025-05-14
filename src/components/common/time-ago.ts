import { DateTime } from "luxon";

export function timeAgo(date: string) {
  const now = DateTime.now();
  const past = DateTime.fromISO(date); // or from other date formats

  const diff = now
    .diff(past, ["years", "months", "days", "hours", "minutes", "seconds"])
    .toObject();

  if (diff.years > 0)
    return `${diff.years} year${diff.years > 1 ? "s" : ""} ago`;

  if (diff.months > 0)
    return `${diff.months} month${diff.months > 1 ? "s" : ""} ago`;

  if (diff.days > 0) return `${diff.days} day${diff.days > 1 ? "s" : ""} ago`;

  if (diff.hours > 0)
    return `${diff.hours} hour${diff.hours > 1 ? "s" : ""} ago`;

  if (diff.minutes > 0) return `${Math.floor(diff.minutes)} min ago`;

  if (diff.seconds > 0) return `${Math.floor(diff.seconds)} sec ago`;

  return "just now";
}
