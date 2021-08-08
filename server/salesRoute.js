import express from "express";
import Sales from "./models/SalesModel.js";
import pagination from "./utils/pagination.js";
import { errorResponse, successResponse, notFoundResponse } from "./utils/responseMessages.js";
const router = express.Router();

//Return all sales with limit and pagination.
router.get("/", async (req, res) => {
    try {
        const paging = await pagination(req);
        const sales = await Sales.find().limit(paging.perpage)
        .skip(paging.perpage * paging.page).sort(paging.sortBy);
        notFoundResponse(res, sales);
        successResponse(res, sales);
    } catch (error) {
        errorResponse(res, error);
    }
});

//Filter sales record using different filtering parameters.
router.get("/filter", async (req, res) => {
    try {
        const paging = await pagination(req);
        const sales = await Sales.find(req.body.filterBy).limit(paging.perpage).skip(paging.perpage * paging.page).sort(paging.sortBy);
        notFoundResponse(res, sales);
        successResponse(res, sales);   
    } catch (error) {
        errorResponse(res, error);
    }
});

//Find a sales using id.
router.get("/:id", async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        notFoundResponse(res, sale);
        successResponse(res, sale);
    } catch (error) {
        errorResponse(res, error);
    }
});

//Create a sales
router.post("/", async (req, res) => {
    const sales = new Sales(req.body);
    try {
        const createdSales = await sales.save();
        successResponse(res, createdSales, 201)
    } catch (error) {
        errorResponse(500);
    }
});

//Update a sales
router.patch('/:id', async (req, res) => {
    try {
        const patchedSales = await Sales.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    saleDate: req.body.saleDate,
                    items: req.body.items,
                    storeLocation: req.body.storeLocation,
                    customer: req.body.customer,
                    couponUsed: req.body.couponUsed,
                    purchaseMethod: req.body.purchaseMethod,
                }
            }
        );
        successResponse(res, patchedSales);
    } catch (error) {
        errorResponse(res, error);
    }
});

//Remove or delete a sales record
router.delete("/:id", async (req, res) => {
    try {
        const deletedSales = await Sales.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Sales is successfully deleted.", sales: deletedSales });
        successResponse(res, deletedSales);
    } catch (error) {
        errorResponse(res, error);
    }
});

export default router;