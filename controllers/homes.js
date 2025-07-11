const pool = require("../db"); // Use the connection pool
//core modules
const path = require("path");
const fs = require("fs");

const getAddHome = (req, res) => {
  res.render("homeForm", {
    pageTitle: "Add Home",
    formAction: "/host/add-home",
    home: null,
    currentPage: "add-home",
  });
};

const postHOme = async (req, res) => {
  try {
    const { homeName, location, price, rating, description } = req.body;
    let photoFileName = null;

    // Handle photo upload (assuming you use express-fileupload or multer)
    if (req.files && req.files.photo && req.files.photo.size > 0) {
      const photo = req.files.photo;
      const photoDir = path.join(__dirname, "../public/photo");
      if (!fs.existsSync(photoDir)) {
        fs.mkdirSync(photoDir, { recursive: true });
      }
      photoFileName = Date.now() + "_" + photo.name;
      const photoPath = path.join(photoDir, photoFileName);
      await photo.mv(photoPath);
      console.log("Photo uploaded to:", photoPath);
    } else {
      console.log("No photo uploaded or file is empty");
    }

    // Save to database (add photoFileName, rating, description)
    const result = await pool.query(
      "INSERT INTO homes (name, location, price, rating, description, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [homeName, location, price, rating, description, photoFileName]
    );
    console.log("Home added:", result.rows[0]);
    //res.sendFile(path.join(__dirname, "../views/thankYouHome.html"));
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

const getEditHome = async (req, res) => {
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
}

const postEditHome = async (req, res) => {
  const { id } = req.params;
  const { homeName, location, price, rating, description } = req.body;
  let photoFileName = null;

  // Handle photo upload if needed
  if (req.files && req.files.photo && req.files.photo.size > 0) {
    const photo = req.files.photo;
    const photoDir = path.join(__dirname, "../public/photo");
    if (!fs.existsSync(photoDir)) {
      fs.mkdirSync(photoDir, { recursive: true });
    }
    photoFileName = Date.now() + "_" + photo.name;
    const photoPath = path.join(photoDir, photoFileName);
    await photo.mv(photoPath);
    console.log("Photo uploaded to:", photoPath);
  }

  await pool.query(
    photoFileName
      ? "UPDATE homes SET name=$1, location=$2, price=$3, rating=$4, description=$5, photo=$6 WHERE home_id=$7"
      : "UPDATE homes SET name=$1, location=$2, price=$3, rating=$4, description=$5 WHERE home_id=$6",
    photoFileName
      ? [homeName, location, price, rating, description, photoFileName, id]
      : [homeName, location, price, rating, description, id]
  );
  res.redirect("/user");
};

const getHomes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = 5;
    const offset = (page - 1) * limit;

    let query;
    let params;

    if (search) {
      query =
        "SELECT * FROM homes WHERE LOWER(name) LIKE $1 ORDER BY home_id DESC LIMIT $2 OFFSET $3";
      params = [`%${search.toLowerCase()}%`, limit, offset];
    } else {
      query = "SELECT * FROM homes ORDER BY home_id DESC LIMIT $1 OFFSET $2";
      params = [limit, offset];
    }

    const result = await pool.query(query, params);

    const countQuery = search
      ? "SELECT COUNT(*) FROM homes WHERE LOWER(name) LIKE $1"
      : "SELECT COUNT(*) FROM homes";
    const countParams = search ? [`%${search.toLowerCase()}%`] : [];
    const countResult = await pool.query(countQuery, countParams);

    const totalHomes = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalHomes / limit);

    res.render("home", {
      homes: result.rows,
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
  postHOme,
  getEditHome,
  postEditHome,
  getHomes,
};