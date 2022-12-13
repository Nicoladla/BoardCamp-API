import dayjs from "dayjs";
import connection from "../database/db.js";
import rentalsSchema from "../models/rentalsSchema.js";

export default async function rentalsValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerExist = await connection.query(
      `SELECT id FROM customers WHERE id=$1;`,
      [customerId]
    );
    if (!customerExist.rows[0]?.id) {
      return res.status(400).send("Cliente inválido!");
    }

    const gameExist = await connection.query(
      `SELECT * FROM games WHERE id=$1;`,
      [gameId]
    );
    if (!gameExist.rows[0]?.id) {
      return res.status(400).send("Jogo não existente!");
    }

    const rentalsExisting = await connection.query(
      `SELECT * FROM rentals WHERE "gameId"=$1;`,
      [gameId]
    );
    const gameIsAvailable =
      rentalsExisting.rows.length < gameExist.rows[0].stockTotal;
    if (!gameIsAvailable) {
      return res.status(400).send("Jogo indisponível.");
    }

    const year = dayjs().year();
    const month = dayjs().month() + 1;
    const day = dayjs().date();

    const currentDate = `${year}-${month}-${day}`;
    const originalPrice = daysRented * gameExist.rows[0].pricePerDay;

    const rentals = {
      customerId,
      gameId,
      daysRented,
      rentDate: currentDate,
      returnDate: null,
      delayFee: null,
      originalPrice,
    };

    const { error } = rentalsSchema.validate(rentals, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    res.locals.rentals = rentals;
    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
