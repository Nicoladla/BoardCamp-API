import connection from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const categories= await connection.query(`SELECT * FROM categories`);
    
    res.send(categories.rows)
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postCategories(req, res) {
    res.send("oii")
}
