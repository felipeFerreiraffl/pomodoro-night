export const getPeriodOfDay = (): "morning" | "afternoon" | "night" => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
};

export const getDateKey = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};
