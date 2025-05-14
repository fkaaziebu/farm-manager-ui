import { DateTime } from "luxon";

const formatDateToText = (isoString: string): string => {
  const date = DateTime.fromISO(isoString).setZone("local"); // Convert to local timezone
  const now = DateTime.now().setZone("local");

  if (date.hasSame(now, "day")) {
    return `Created today at ${date.toFormat("h:mm a")}`;
  }

  if (date.hasSame(now.minus({ days: 1 }), "day")) {
    return `Created yesterday at ${date.toFormat("h:mm a")}`;
  }

  return `Created on ${date.toFormat("MMM d 'at' h:mm a")}`;
};

export default formatDateToText;
