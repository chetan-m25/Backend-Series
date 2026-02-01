require("dotenv").config();
const app = require("./src/app");
const connecToDB = require("./src/config/database");

connecToDB();

app.listen(8000, (req, res) => {
  console.log("Server is running on port 8000");
});
