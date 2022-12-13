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

export async function putRentals(req, res) {}

export async function deleteRentals(req, res) {}
