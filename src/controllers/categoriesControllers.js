import connection from "../database/db.js";
import categoriesSchema from "../models/categoriesSchema.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query(`SELECT * FROM categories`);

    res.send(categories.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postCategories(req, res) {
  const { name } = req.body;

  try {
    if (!name) return res.status(400).send("Insira uma categoria!");

    const { error } = categoriesSchema.validate(
      { name },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    const categorieExist = await connection.query(
      `SELECT name FROM categories WHERE name ILIKE '%'||$1||'%';`,
      [name]
    );
    if (categorieExist.rows[0]?.name) {
      return res.status(409).send("Categoria já existente");
    }

    await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
