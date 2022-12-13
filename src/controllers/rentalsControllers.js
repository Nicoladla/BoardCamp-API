import dayjs from "dayjs";
import connection from "../database/db.js";

export async function getRentals(req, res) {
  try {
    const rentals = await connection.query(
      `SELECT 
        rentals.*, customers.id AS idc, customers.name
      FROM 
        rentals JOIN customers 
      ON 
        rentals."customerId" = customers.id`
    );
    rentals.rows = {
      ...rentals.rows,
      customer: { id: rentals.rows.idc, name: rentals.rows.name },
    };

    res.status(200).send(rentals.rows);
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

export async function patchRentals(req, res) {
  const { id } = req.params;
  const { returnDate, rentDate, daysRented, originalPrice } =
    res.locals.rentals;

  try {
    if (returnDate) {
      return res.status(400).send("Aluguel já encerrado!");
    }

    const year = dayjs().year();
    const month = dayjs().month() + 1;
    const day = dayjs().date();

    const currentDate = `${year}-${month}-${day}`;

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
