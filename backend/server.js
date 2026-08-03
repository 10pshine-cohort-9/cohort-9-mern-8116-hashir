require("dotenv").config();

const connectToDB = require("./src/config/database");
const logger = require("./src/logger/logger");
const PORT = process.env.PORT || 3500;

connectToDB();

const app = require("./src/app");

app.listen(3500, () => {
  logger.info(`Server is running on ${PORT}`);
});
