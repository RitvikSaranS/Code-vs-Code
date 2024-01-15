const fs = require("fs");

function logError(errMessage, filePath) {
  console.error("Error:", errMessage);
  const logMessage = `${errMessage} - ${new Date().toISOString()} - ${filePath}\n`;
  const logFilePath = "./logs/errorlog.txt";
  fs.appendFile(logFilePath, logMessage, (appendError) => {
    if (appendError) {
      console.error("Error writing to errorlog file:", appendError);
    }
  });
}

module.exports = logError;
