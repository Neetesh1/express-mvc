const express = require('express');
const fileUpload = require('express-fileupload');
// Core modules
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views','views'); // Set the views directory

// Local modules
const hostRoutes = require('./routes/hostRouter');
const userRouter = require("./routes/userRouter");
const contactRouter = require("./routes/contactRouter");
const rootDir = require('./utils/pathUtils');
const notFoundController = require('./controllers/404');

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(fileUpload()); // Middleware to handle file uploads

app.use((req, res, next) => {
  console.log(`first dummy middleware: ${req.method} ${req.url}`);
  next();
});

app.use("/user", userRouter);
app.use("/host", hostRoutes);
app.use("/contact-us", contactRouter); // Contact routes

app.use(express.static(path.join(rootDir, 'public'))); // Serve static files from the public directory

// Home page route for / and empty path
app.get(["/", ""], (req, res) => {
  res.redirect("/user");
});

// 404 fallback
app.use(notFoundController);


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});


