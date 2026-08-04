require("dotenv").config();

const connectToDB = require("./src/config/database");
const logger = require("./src/logger/logger");
const PORT = process.env.PORT || 3500;

const app = require("./src/app");

async function startServer() {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      logger.info(`Server is running on ${PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();