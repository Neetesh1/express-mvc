module.exports = class Home {
  constructor(name, location, price, rating, description, photo) {
    this.name = name;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.description = description;
    this.photo = photo;
  }


  async save() {
    // Logic to save the home instance to the database
    const pool = require("../db");
    const result = await pool.query(
      "INSERT INTO homes (name, location, price, rating, description, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        this.name,
        this.location,
        this.price,
        this.rating,
        this.description,
        this.photo,
      ]
    );
    return result.rows[0];
  }

  async fetchAll(req) {
    // Logic to fetch all homes from the database
    const pool = require("../db");
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
    return {
      homes: result.rows,
      currentPage: page,
      totalPages: totalPages,
      search: search,
    };
  }
};
