require("express-async-errors");
const AsyncErrors = require("./utils/AsyncError");
const express = require("express");
const sqliteConnection = require("./database/sqlite");
const routes = require("./routes");

const dealWithAsyncErrors = new AsyncErrors();
sqliteConnection();
const app = express();
app.use(express.json());

app.use(routes);

app.use(dealWithAsyncErrors.dealWithAsyncErrors);

const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
