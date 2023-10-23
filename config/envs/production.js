require("dotenv").config();
module.exports = {
  MONGO_URI: process.env.MONGO_URI_PROD,
  REDIS_URI: process.env.REDIS_URI_PROD,
};
