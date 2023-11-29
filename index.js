const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected, Your Express API is now listening`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// app.use(cors());
// app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/addresses", require("./routes/addresses"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/users"));
app.use("/api/bookmarks", require("./routes/bookmarks"));

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
