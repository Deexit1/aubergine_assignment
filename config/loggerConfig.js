const winston = require("winston");
const path = require("path");

const INFO_LOG_FILE = path.join(__dirname, "..", "logs", "server.log");
const ERROR_LOG_FILE = path.join(__dirname, "..", "logs", "server_errors.log");

/**
 * Winston logger configuration.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  transports: [
    /**
     * Console transport for logging messages to the console.
     * @type {winston.transports.ConsoleTransportInstance}
     */
    new winston.transports.Console({ level: "info" }),

    /**
     * File transport to log messages to a file.
     * @type {winston.transports.FileTransportInstance}
     */
    new winston.transports.File({
      filename: INFO_LOG_FILE,
      level: "info",
    }),
    new winston.transports.File({
      filename: ERROR_LOG_FILE,
      level: "error",
    }),
  ],
});

module.exports = logger;
