export const shouldUseTextarea = (text: String) => {
  return text.length > 100 || text.includes("\n");
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};
