const pool = require("../db"); // Use the connection pool

module.exports.getContactForm = (req, res) => {
  res.render("contact", {
    pageTitle: "Contact Us",
    response: null,
    name: "",
    email: "",
    message: ""
  });
};

module.exports.postContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  //save the contact form data to the database or perform any other logic here
  const result = await pool.query(
    "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );
  console.log("Contact form submitted:", result.rows[0]);

  res.render("contact", {
    pageTitle: "Contact Us",
    response: "thankyou",
    name,
    email,
    message
  });
};
