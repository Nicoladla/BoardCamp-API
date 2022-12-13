import dayjs from "dayjs";
import connection from "../database/db.js";
import CurrentDate from "../helpers/currentDateHelpers.js";

export async function getRentals(req, res) {
  let { customerId } = req.query;
  let { gameId } = req.query;
  console.log(gameId);

  if (!customerId && !gameId) {
    customerId = "";
    gameId = "";
  } else if (!customerId) {
    customerId = "";
  } else if (!gameId) {
    gameId = "";
  }

  try {
    const rentals = await connection.query(
      `SELECT 
        rentals.*, 
        customers.name AS "customerName", 
        games.name AS "gameName", games."categoryId",
        categories.name AS "categoryName"
      FROM 
        rentals JOIN customers 
      ON 
        rentals."customerId" = customers.id
      JOIN
        games
      ON
        rentals."gameId" = games.id
      JOIN
        categories
      ON
        games."categoryId" = categories.id`,
      []
    );

    const newRentals = rentals.rows.map((rental) => {
      return {
        ...rental,
        customer: {
          id: rental.customerId,
          name: rental.customerName,
        },
        game: {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        },
        customerName: undefined,
        gameName: undefined,
        categoryId: undefined,
        categoryName: undefined,
      };
    });

    res.status(200).send(newRentals);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postRentals(req, res) {
  const { rentals } = res.locals;

  try {
    await connection.query(
      `INSERT INTO rentals 
        ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "delayFee", "originalPrice")
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7);`,
      [
        rentals.customerId,
        rentals.gameId,
        rentals.daysRented,
        rentals.rentDate,
        rentals.returnDate,
        rentals.delayFee,
        rentals.originalPrice,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postPatchRentals(req, res) {
  const { id } = req.params;
  const { returnDate, rentDate, daysRented, originalPrice } =
    res.locals.rentals;

  try {
    if (returnDate) {
      return res.status(400).send("Aluguel já encerrado!");
    }

    const currentDate = CurrentDate();

    const daysOfUse = dayjs(currentDate).diff(rentDate, "day");
    let delayFee = 0;

    if (daysOfUse > daysRented) {
      delayFee = (daysOfUse - daysRented) * (originalPrice / daysRented);
    }

    await connection.query(
      `UPDATE rentals SET "returnDate"=$1 , "delayFee"=$2 WHERE id=$3`,
      [currentDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;
  const { returnDate } = res.locals.rentals;

  try {
    if (!returnDate) {
      return res.status(400).send("O aluguel não está encerrado!");
    }

    await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
