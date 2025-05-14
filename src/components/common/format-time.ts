import { DateTime } from "luxon";

const formatTime = (isoString: string): string => {
  return DateTime.fromISO(isoString).setZone("local").toFormat("h:mm a");
};

export default formatTime;
