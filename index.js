import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
// routo takelyje items turi buti su pletiniu .js, kitaip nesuveiks
import itemRoutes from "./src/routes/item.js";
import userRoutes from "./src/routes/user.js";

const app = express();
// pasakome, kad duomenis gauname json formatu
app.use(express.json());
// problema: meta klaida perejus prie loginimosi processinimo is .env
let uri = "mongodb+srv://TestUser123:TestUser123@cluster1.i67w6ae.mongodb.net/";
app.use(cors());
mongoose
  // .connect(process.env.MONGO_CONNECTION)
  .connect(uri)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log("ERR:", err);
  });

// uznaudojam, kitaip neras endpointo
app.use(userRoutes);
app.use(itemRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("app started on port:", process.env.PORT);
});
