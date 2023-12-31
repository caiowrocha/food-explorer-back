require("dotenv/config");
require("express-async-errors");
const AsyncErrors = require("./utils/AsyncError");
const express = require("express");
const sqliteConnection = require("./database/sqlite");
const cors = require("cors");
const routes = require("./routes");
const uploadConfig = require("./config/upload");
const dealWithAsyncErrors = new AsyncErrors();
sqliteConnection();
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use(dealWithAsyncErrors.dealWithAsyncErrors);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
