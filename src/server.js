import express from "express";
import cors from "cors";

import categoriesRouters from "./routers/categoriesRouters.js";
import gamesRouters from "./routers/gamesRouters.js";
import customersRouters from "./routers/customersRouters.js";
import rentalsRouters from "./routers/rentalsRouters.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("API funcionando corretamente."))
app.use(categoriesRouters);
app.use(gamesRouters);
app.use(customersRouters);
app.use(rentalsRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
