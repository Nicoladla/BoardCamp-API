import connection from "../database/db.js";
import gamesSchema from "../models/gamesSchema.js";

export async function getGames(req, res) {
  try {
    const games = await connection.query(
      `SELECT 
        games.*, categories.name AS "categoryName"
      FROM 
        games JOIN categories 
      ON 
        games."categoryId" = categories.id;`
    );

    res.status(200).send(games.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postGames(req, res) {
  const game = req.body;

  try {
    const { error } = gamesSchema.validate(game, { abortEarly: false });
    if (error) {
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
      }
    }

    const categorieExist = await connection.query(
      `SELECT * FROM categories WHERE id=$1;`,
      [game.categoryId]
    );
    if (!categorieExist.rows[0]?.name) {
      return res.status(400).send("Categoria não existente");
    }

    const gameExist = await connection.query(
      `SELECT name FROM games WHERE name ILIKE '%'||$1||'%';`,
      [game.name]
    );
    if (gameExist.rows[0]?.name) {
      return res.status(409).send("Jogo com nome já existente");
    }

    await connection.query(
      `INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES 
        ($1, $2, $3, $4, $5);`,
      [
        game.name,
        game.image,
        game.stockTotal,
        game.categoryId,
        game.pricePerDay,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
