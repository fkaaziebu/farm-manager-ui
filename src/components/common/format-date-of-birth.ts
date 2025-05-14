import { DateTime } from "luxon";

const formatDateOfBirth = (isoString: string): string => {
  const date = DateTime.fromISO(isoString).setZone("local"); // Convert to local timezone
  const now = DateTime.now();

  // Calculate age
  const age = now.year - date.year;

  // Get day with ordinal suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const day = date.day;
  const ordinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    const suffixes = ["st", "nd", "rd"];
    return suffixes[(n % 10) - 1] || "th";
  };

  return `${day}${ordinalSuffix(day)} ${date.toFormat("MMM yyyy")} (${age} yr)`;
};

export default formatDateOfBirth;
