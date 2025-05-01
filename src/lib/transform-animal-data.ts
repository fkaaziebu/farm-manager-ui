import { Livestock } from "@/graphql/generated/graphql";

export default function transformAnimalData({
  livestocks = [],
}: {
  livestocks: Array<Livestock>;
}) {
  // Extract the animals array from the input data

  // Group animals by type
  const groupedByType: Record<
    string,
    { type: string; breed: string; count: number; statuses: string[] }
  > = {};

  for (const livestock of livestocks) {
    const type = livestock.livestock_type || "Unknown";
    const breed = livestock.breed || "Unknown";
    const status = livestock.health_status || "Unknown"; // Using the status field you mentioned

    // Initialize the group if it doesn't exist
    if (!groupedByType[type]) {
      groupedByType[type] = {
        type,
        breed,
        count: 0,
        statuses: [],
      };
    }

    // Increment count
    groupedByType[type].count++;

    // Add status to array for health determination
    groupedByType[type].statuses.push(status);
  }

  // Convert the grouped object to an array and determine health
  return Object.values(groupedByType).map((group) => {
    // Determine health based on statuses
    const health = determineHealthStatus(group.statuses);

    return {
      type: formatType(group.type), // Format type string (e.g., "GRASSCUTTER" -> "Grasscutter")
      breed: formatBreed(group.breed), // Format breed string
      count: group.count,
      health,
    };
  });
}

function determineHealthStatus(statuses: Array<string>) {
  if (!statuses.length) return "Unknown";

  // Count occurrences of each status
  const statusCounts: Record<string, number> = {};
  statuses.forEach((status) => {
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Calculate percentages
  const total = statuses.length;
  const percentages: Record<string, number> = {};
  Object.keys(statusCounts).forEach((status) => {
    percentages[status] = (statusCounts[status] / total) * 100;
  });

  // Determine overall health based on status distribution
  // This is a simple algorithm - you can adjust the logic based on your needs
  if (percentages["HEALTHY"] >= 80) return "Excellent";
  if (percentages["HEALTHY"] >= 60) return "Good";
  if (percentages["HEALTHY"] >= 40) return "Fair";
  return "Poor";
}

function formatType(type: string) {
  // Convert from uppercase to title case
  // Map specific types if needed (e.g., "GRASSCUTTER" could be mapped to "Cattle")
  if (type === "GRASSCUTTER") return "Grasscutter";

  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

function formatBreed(breed: string) {
  // Convert from uppercase to title case
  // Map specific breeds if needed
  if (breed === "NORMAL") return "Standard";

  return breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase();
}
