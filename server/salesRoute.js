import express from "express";
import Sales from "./models/SalesModel.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find()
        .limit( 10 );        
        res.status(200).json({ sales });
    } catch (err) {
        res.status(404).json({ message: "404. Resource Not Found.", error: err });
    }
});

export default router;