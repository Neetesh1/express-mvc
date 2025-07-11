const pool = require("../db");
const Home = require("../models/home");
const path = require("path");
const fs = require("fs");

// Utility to handle photo upload
const handlePhotoUpload = async (photo) => {
  if (!photo || photo.size === 0) return null;

  const photoDir = path.join(__dirname, "../public/photo");
  if (!fs.existsSync(photoDir)) {
    fs.mkdirSync(photoDir, { recursive: true });
  }

  const photoFileName = `${Date.now()}_${photo.name}`;
  const photoPath = path.join(photoDir, photoFileName);
  await photo.mv(photoPath);
  console.log("Photo uploaded to:", photoPath);
  return photoFileName;
};

// Render Add Home form
const getAddHome = (req, res) => {
  res.render("homeForm", {
    pageTitle: "Add Home",
    formAction: "/host/add-home",
    home: null,
    currentPage: "add-home",
  });
};

// Add new home
const postHome = async (req, res) => {
  try {
    const { homeName, location, price, rating, description } = req.body;
    const photoFileName = await handlePhotoUpload(req.files?.photo);

    const home = new Home(
      homeName,
      location,
      price,
      rating,
      description,
      photoFileName
    );
    const response = await home.save();
    console.log("Home added:", response);

    res.render("thankYouHome", {
      pageTitle: "Thank You",
      message: "Your home has been added successfully!",
    });
  } catch (err) {
    console.error("Error adding home:", err);
    res
      .status(500)
      .send("<h1>Error adding home</h1><p>Please try again later.</p>");
  }
};

// Render Edit Home form
const getEditHome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM homes WHERE home_id = $1", [
      id,
    ]);
    if (result.rows.length === 0) return res.status(404).send("Home not found");

    res.render("homeForm", {
      home: result.rows[0],
      pageTitle: "Edit Home",
      formAction: `/host/edit-home/${id}`,
    });
  } catch (err) {
    console.error("Error fetching home for edit:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Update existing home
const postEditHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { homeName, location, price, rating, description } = req.body;
    const photoFileName = await handlePhotoUpload(req.files?.photo);

    const query = photoFileName
      ? `UPDATE homes SET name=$1, location=$2, price=$3, rating=$4, description=$5, photo=$6 WHERE home_id=$7`
      : `UPDATE homes SET name=$1, location=$2, price=$3, rating=$4, description=$5 WHERE home_id=$6`;

    const values = photoFileName
      ? [homeName, location, price, rating, description, photoFileName, id]
      : [homeName, location, price, rating, description, id];

    await pool.query(query, values);
    console.log("Home updated:", id);

    res.redirect("/user");
  } catch (err) {
    console.error("Error updating home:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch all homes (with pagination & search)
const getHomes = async (req, res) => {
  try {
    const home = new Home();
    const {
      homes,
      currentPage: page,
      totalPages,
      search,
    } = await home.fetchAll(req);

    res.render("home", {
      homes,
      pageTitle: "Home",
      currentPage: page,
      totalPages,
      search,
    });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAddHome,
  postHome, // fixed casing
  getEditHome,
  postEditHome,
  getHomes,
};
