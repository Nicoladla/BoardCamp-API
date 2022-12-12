import connection from "../database/db.js";
import customersSchema from "../models/customersSchema.js";

export async function getCustomers(req, res) {}

export async function postCustomers(req, res) {
  const customer = req.body;

  try {
    const { error } = customersSchema.validate(customer, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    const customerCpfExist = await connection.query(
      `SELECT cpf FROM customers WHERE cpf=$1;`,
      [customer.name]
    );
    if (customerCpfExist.rows[0]?.cpf) {
      return res.status(409).send("CPF já cadastrado");
    }

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
