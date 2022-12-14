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
  const { id } = req.params;

  try {
    const customers = await connection.query(
      `SELECT * FROM customers WHERE id=$1;`,
      [id]
    );

    res.status(200).send(customers.rows[0]);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customerCpfExist = await connection.query(
      `SELECT cpf FROM customers WHERE cpf=$1;`,
      [cpf]
    );
    if (customerCpfExist.rows[0]?.cpf) {
      return res.status(409).send("CPF já cadastrado");
    }

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
