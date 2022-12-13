import connection from "../database/db.js";

export async function getCustomers(req, res) {
  let { cpf } = req.query;
  if (!cpf) cpf = "";

  try {
    const customers = await connection.query(
      `SELECT * FROM customers WHERE cpf LIKE $1||'%';`,
      [cpf]
    );

    res.status(200).send(customers.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function getCustomersId(req, res) {

}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function putCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
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
      return res.status(400).send("Id do cliente inválido!");
    }

    await connection.query(
      `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
