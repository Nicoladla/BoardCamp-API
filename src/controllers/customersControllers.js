import connection from "../database/db.js";

export async function getCustomers(req, res) {}

export async function postCustomers(req, res) {
  const customer = req.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
      [customer.name, customer.phone, customer.cpf, customer.birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function putCustomers(req, res) {}
