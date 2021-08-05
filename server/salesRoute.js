import express from "express";
import Sales from "./models/SalesModel.js";

const router = express.Router();

//Return all sales with limit and pagination.
router.get("/", async (req, res) => {
    try {
        const sales = await Sales.find().limit(100);        
        res.status(200).json({ sales });
    } catch (err) {
        res.status(404).json({ message: "404. Resource Not Found.", error: err });
    }
});

//Filter sales record using different filtering parameters.
router.get("/filter", async (req, res) => {
    try {
        const sales = await Sales.find(req.body.filterBy).limit(10);
        if (sales) {
            res.status(200).json({sales});
        } else {
            res.status(404).json({Message: "Resource Not Found"});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});

//Find a sales using id.
router.get("/:id", async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (sale) {
            res.status(200).json({sale});
        } else {
            res.status(404).json({Message: "Resource Not Found"});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});

//Create a sales
router.post("/", async (req, res) => {
    const sales = new Sales({
        salesDate: req.body.salesDate,
        items: req.body.items,
        storeLocation: req.body.storeLocation,
        customer: req.body.customer,
        couponUsed: req.body.couponUsed,
        purchaseMethod: req.body.purchaseMethod,
    });
    try {
        const createdSales = await sales.save();
        if (createdSales) {
            res.status(201).json({message: "New Sales Successully Created.", createdSales});
        } else {
            res.status(202).json({message: "Not successfully created."});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});

//Update a sales
router.patch('/:id', async (req, res) => {
    try {
        const patchedSales = await Sales.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    salesDate: req.body.salesDate,
                    items: req.body.items,
                    storeLocation: req.body.storeLocation,
                    customer: req.body.customer,
                    couponUsed: req.body.couponUsed,
                    purchaseMethod: req.body.purchaseMethod,
                }
            }
        );
        res.status(200).json({ message: "Sales is successfully updated.", sales: patchedSales })
    } catch (error) {
        res.status(500).json({ message: "Sales is successfully not updated.", error: error });
    }
});

//Remove or delete a sales record
router.delete("/:id", async (req, res) => {
    try {
        const deletedSales = await Sales.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Sales is successfully deleted.", sales: deletedSales });
    } catch (error) {
        res.status(500).json({ message: "Sales is not deleted. ", error: error });
    }
});

export default router;