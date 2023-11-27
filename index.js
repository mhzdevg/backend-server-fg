const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/addresses", require("./routes/addresses"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/users"));
app.use("/api/bookmarks", require("./routes/bookmarks"));

app.listen(port, () => {
  console.log(`Flame Grill API listening at http://localhost:${port}`);
});
