const isDev = __DEV__;

export const isDevelopment = isDev;

export const LOG_SCOPE = {
  auth: "AUTH",
  api: "API",
  router: "ROUTER",

  user: "USER",
  store: "STORE",

  book: "BOOK",
  request: "REQUEST",
  notification: "NOTIFICATION",
  record: "RECORD",

  image: "IMAGE",
  upload: "UPLOAD",

  query: "QUERY", // React Query
  cache: "CACHE", // caching/persistence

  system: "SYSTEM",
} as const;

const formatTime = () =>
  new Date().toLocaleString("en-GB", {
    hour12: false,
  });

const formatData = (data: unknown) => {
  if (data == null) return String(data);

  if (data instanceof Error) {
    return JSON.stringify(
      {
        name: data.name,
        message: data.message,
        stack: data.stack,
      },
      null,
      2,
    );
  }

  if (typeof data === "string") {
    return data;
  }

  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return Object.prototype.toString.call(data);
  }
};

const output = (
  scope: string,
  level: "LOG" | "INFO" | "WARN" | "ERROR" | "DEBUG",
  title: string,
  data?: unknown,
) => {
  if (!isDev && (level === "DEBUG" || level === "LOG")) {
    return;
  }

  const logger =
    level === "ERROR"
      ? console.log
      : level === "WARN"
        ? console.warn
        : level === "DEBUG"
          ? console.log
          : level === "INFO"
            ? console.info
            : console.log;

  logger(`[${formatTime()}] [${scope}] ${level} :: ${title}`);

  if (data !== undefined) {
    logger(formatData(data));
  }

  // logger("────────────────────────────────────────"); // blank line
};

export const logger = {
  log(scope: string, title: string, data?: unknown) {
    output(scope, "LOG", title, data);
  },

  debug(scope: string, title: string, data?: unknown) {
    output(scope, "DEBUG", title, data);
  },

  info(scope: string, title: string, data?: unknown) {
    output(scope, "INFO", title, data);
  },

  warn(scope: string, title: string, data?: unknown) {
    output(scope, "WARN", title, data);
  },

  error(scope: string, title: string, data?: unknown) {
    output(scope, "ERROR", title, data);
  },
  // json: formatData,
};
