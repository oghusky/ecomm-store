const express = require('express'),
  app = express(),
  connectDB = require('./config/connectDB'),
  PORT = process.env.PORT || 3001;

connectDB();

// express middleware
app.use(express.json());
app.use(express.static("client/build"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ msg: "SERVER UP!" });
});

app.use("/api/auth", require('./routes/auth-routes'));

// listening port
app.listen(PORT, () => {
  console.log(`SERVERS STARTED http://localhost:3001`);
})
