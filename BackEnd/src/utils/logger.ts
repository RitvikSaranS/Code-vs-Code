const fs = require("fs");

function logError(errMessage: string, filePath: string) {
  console.error("Error:", errMessage);
  const logMessage = `${errMessage} - ${new Date().toISOString()} - ${filePath}\n`;
  const logFilePath = "./logs/errorlog.txt";
  fs.appendFile(logFilePath, logMessage, (appendError: string) => {
    if (appendError) {
      console.error("Error writing to errorlog file:", appendError);
    }
  });
}

export default logError;
