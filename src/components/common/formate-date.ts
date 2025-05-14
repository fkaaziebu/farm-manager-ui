import { DateTime } from "luxon";

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th"; // Special cases for 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (isoString: string) => {
  const date = DateTime.fromISO(isoString).setZone("UTC");
  const day = date.day;
  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${date.toFormat("MMM yyyy")}`;
};

export default formatDate;
