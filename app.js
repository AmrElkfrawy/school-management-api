const config = require("./config/index.config.js");
const ManagersLoader = require("./loaders/ManagersLoader.js");

const mongoDB = config.dotEnv.MONGO_URI
  ? require("./connect/mongo")({
      uri: config.dotEnv.MONGO_URI,
    })
  : null;

const managersLoader = new ManagersLoader({ config });
const managers = managersLoader.load();

managers.userServer.run();
