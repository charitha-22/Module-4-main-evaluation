import fs from 'fs';

export const logger = (req, res, next) => {
  const logLine = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
  fs.appendFile("logs.txt", logLine, (err) => {
    if (err) {
      console.error("Error writing log");
    }
  });
  next();
};