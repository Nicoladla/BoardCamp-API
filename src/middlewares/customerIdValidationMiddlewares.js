import connection from "../database/db.js";

export default async function customerIdValidation(req, res, next) {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).send("Id do cliente inválido!");
    }

    const idCustomersExist = await connection.query(
      `SELECT id FROM customers WHERE id=$1`,
      [id]
    );
    if (!idCustomersExist.rows[0]?.id) {
      return res.status(404).send("Cliente não encontrado!");
    }

    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
