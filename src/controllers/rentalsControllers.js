import connection from "../database/db.js";

export async function getRentals(req, res) {}

export async function postRentals(req, res) {
  const rentals = req.body;

  try {
    
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function putRentals(req, res) {}

export async function deleteRentals(req, res) {}
