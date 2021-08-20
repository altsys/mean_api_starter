import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import salesRoute from "./salesRoute.js";
import userRoute from "./userRoute.js";

import { errorResponse } from "./utils/responseMessages.js";

dotenv.config();

const uri = process.env.MEAN_API_DB_URI;
const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));
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