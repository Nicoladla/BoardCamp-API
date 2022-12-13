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

export async function putRentals(req, res) {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).send("Id do aluguel inválido!");
    }

    const idRentalsExist = await connection.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [id]
    );
    if (!idRentalsExist.rows[0]?.id) {
      return res.status(404).send("Aluguel não encontrado!");
    }

    if (idRentalsExist.rows[0].returnDate) {
      return res.status(400).send("Aluguel já encerrado!");
    }

    const year = dayjs().year();
    const month = dayjs().month() + 1;
    const day = dayjs().date();

    const currentDate = `${year}-${month}-${day}`;
    const { rentDate, daysRented, originalPrice } = idRentalsExist.rows[0];

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

export async function deleteRentals(req, res) {}
