import { DateTime } from "luxon";

export function timeAgo(date: string) {
  const now = DateTime.now();
  const past = DateTime.fromISO(date); // or from other date formats

  const diff = now
    .diff(past, ["years", "months", "days", "hours", "minutes", "seconds"])
    .toObject();

  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = diff;

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  if (minutes > 0) return `${Math.floor(minutes)} min ago`;

  if (seconds > 0) return `${Math.floor(seconds)} sec ago`;

  return "just now";
}
