import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import salesRoute from "./salesRoute.js";
import userRoute from "./userRoute.js";

import { errorResponse } from "./utils/responseMessages.js";

dotenv.config();

const uri = process.env.MEAN_API_DB_URI;
const port = process.env.PORT | 5000;

const app = express();

// app.use(cors());
app.use(express.json());
// app.use(pagination);

app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/user", userRoute);
app.get("/", (req, res) => {
    res.send("We are running on home.");
});
app.use("*", (req, res) => errorResponse(res, "", 404));

mongoose.connect(uri,
        { useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology: true })
        .then(() => console.log('Mongo DB Connected'))
        .catch((error)=> {
            console.log(error);
        });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

export default app;