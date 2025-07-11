module.exports = (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "404.html"));
  res.render("404", {
    pageTitle: "Page Not Found",
    message: "The page you are looking for does not exist.",
  }); // Render a 404 page
};