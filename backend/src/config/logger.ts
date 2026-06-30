import winston from "winston";

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Custom pretty JSON format (DEV)
 */
const prettyJsonFormat = winston.format.printf((info) => {
  const { timestamp, level, message, ...meta } = info;

  return JSON.stringify(
    {
      timestamp,
      level,
      message,
      ...meta,
    },
    null,
    2, // 👈 THIS is what makes it line-broken & readable
  );
});

const logger = winston.createLogger({
  level: isDevelopment ? "debug" : "info",
  format: isDevelopment
    ? winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.printf(
          ({ timestamp, level, message, stack, ...meta }: any) => {
            const extra =
              Object.keys(meta).length > 0
                ? `\n${JSON.stringify(meta, null, 2)}`
                : "";
            const cleanStack = stack
              ? `\nStack:\n${stack
                  .split("\n")
                  .slice(0, 6)
                  .map((line: string) => `${line.trim()}`)
                  .join("\n")}`
              : "";

            //  const cleanStack = stack
            //   ? `\nStack:\n${JSON.stringify(
            //       stack.split("\n").slice(0, 6),
            //       null,
            //       2
            //     )}`
            //   : "";

            return `[${timestamp}] ${level}: ${message}${extra}${cleanStack}`;
          },
        ),
      )
    : winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),

  transports: [new winston.transports.Console()],
});

export default logger;
