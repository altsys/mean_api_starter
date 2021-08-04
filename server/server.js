import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import sales from "./salesRoute.js";

dotenv.config();

const uri = process.env.MEAN_API_DB_URI;
const port = process.env.PORT | 5000;

const app = express();

// app.use(cors());
app.use(express.json());


app.use("/api/v1/sales", sales);
app.get("/", (req, res) => {
    res.send("We are running on home.");
});
app.use("*", (req, res) => res.status(404).json({ error: "404. Resource Not Found." }));

mongoose.connect(uri,
        { useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology: true })
        .then(() => console.log('Mongo DB Connected'));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

export default app;