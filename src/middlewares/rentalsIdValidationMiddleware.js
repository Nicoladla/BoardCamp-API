import connection from "../database/db.js";

export default async function rentalsIdValidation(req, res, next) {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).send("Id do aluguel inválido!");
    }

    const idRentalsExist = await connection.query(
      `SELECT id, "returnDate" FROM rentals WHERE id=$1`,
      [id]
    );
    if (!idRentalsExist.rows[0]?.id) {
      return res.status(404).send("Aluguel não encontrado!");
    }

    res.locals.rentals= idRentalsExist.rows[0];
    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
