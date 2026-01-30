// This file is to start server and connects to database

const app = require("./src/app");
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(
      "mongodb://chetan:c2h6e0t9a2n5@" +
        "ac-otovpwq-shard-00-01.xksnwyz.mongodb.net:27017," +
        "ac-otovpwq-shard-00-02.xksnwyz.mongodb.net:27017," +
        "ac-otovpwq-shard-00-00.xksnwyz.mongodb.net:27017/" +
        "day-06?ssl=true&replicaSet=atlas-11co2t-shard-0&authSource=admin&retryWrites=true&w=majority",
    )
    .then(() => {
      console.log("Database Connected");
    });
}
connectDB();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
