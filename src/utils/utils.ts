export const formatTimestamp = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = milliseconds.toString().padStart(2, "0");

  return `${formattedSeconds}:${formattedMilliseconds}`;
};

export const calculatePercentages = (max: number, interval: number) => {
  if (max <= 0 || interval <= 0) {
    throw new Error("Both max and interval must be greater than 0.");
  }
  if (interval > max) {
    throw new Error("Interval must be less than or equal to max.");
  }

  const percentages = [];
  for (let current = 0; current <= max; current += interval) {
    const percentage = msToPercentage(current, max);
    percentages.push(percentage);
  }

  return percentages;
};

export const msToPercentage = (ms: number, maxMs: number) => (ms / maxMs) * 100;

export const percentageToMs = (percentage: number, maxMs: number) => (percentage / 100) * maxMs;
