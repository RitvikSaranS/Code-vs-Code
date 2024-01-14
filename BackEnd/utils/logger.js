const fs = require("fs");

function logError(errMessage) {
  console.error("Error:", errMessage);
  const filename = path.basename(__filename);
  const logMessage = `Error: ${
    error.message
  } - ${new Date().toISOString()} - ${filename}\n`;
  const logFilePath = "../logs/errorlog.txt";
  fs.appendFile(logFilePath, logMessage, (appendError) => {
    if (appendError) {
      console.error("Error writing to errorlog file:", appendError);
    }
  });
}

module.exports = logError;
