const isDev = __DEV__;

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour12: false,
  });

const formatData = (data: unknown) => {
  if (data === undefined) return "";

  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
};

const output = (
  level: "LOG" | "INFO" | "WARN" | "ERROR",
  title: string,
  data?: unknown
) => {
  if (!isDev && level !== "ERROR") return;

  const logger =
    level === "ERROR"
      ? console.error
      : level === "WARN"
      ? console.warn
      : console.log;

  logger(`[${formatTime()}] ${level} :: ${title}`);

  if (data !== undefined) {
    logger(formatData(data));
  }

  logger(""); // blank line
};

export const Logger = {
  log(title: string, data?: unknown) {
    output("LOG", title, data);
  },

  info(title: string, data?: unknown) {
    output("INFO", title, data);
  },

  warn(title: string, data?: unknown) {
    output("WARN", title, data);
  },

  error(title: string, data?: unknown) {
    output("ERROR", title, data);
  },

  json: formatData,
};