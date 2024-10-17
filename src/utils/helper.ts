const SECOND = 1;
const NANO = 1000000;
const MEMORY_LIMIT_BYTES = 65536;

export const shouldUseTextarea = (text: String) => {
  return text.length > 100 || text.includes("\n");
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

export function convertDifficulty(difficulty: number) {
  switch (difficulty) {
    case 1:
      return "Easy";
    case 2:
      return "Medium";
    case 3:
      return "Hard";
    default:
      return "Unknown";
  }
}

export function convertMemory(
  value: number,
  fromUnit: "byte" | "kilobyte" | "megabyte",
  toUnit: "byte" | "kilobyte" | "megabyte"
): number {
  const BYTE_TO_KILOBYTE = 1024;
  const BYTE_TO_MEGABYTE = 1024 * 1024;

  if (fromUnit === "byte" && toUnit === "kilobyte") {
    return value / BYTE_TO_KILOBYTE;
  } else if (fromUnit === "kilobyte" && toUnit === "byte") {
    return value * BYTE_TO_KILOBYTE;
  } else if (fromUnit === "byte" && toUnit === "megabyte") {
    return value / BYTE_TO_MEGABYTE;
  } else if (fromUnit === "megabyte" && toUnit === "byte") {
    return value * BYTE_TO_MEGABYTE;
  } else if (fromUnit === "kilobyte" && toUnit === "megabyte") {
    return value / BYTE_TO_KILOBYTE;
  } else if (fromUnit === "megabyte" && toUnit === "kilobyte") {
    return value * BYTE_TO_KILOBYTE;
  } else {
    return value;
  }
}
