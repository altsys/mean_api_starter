import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
    {
        salesDate: {
            type: Date,
            required: "Date is required."
        },
        storeLocation: String,
        items: [Object],
        customer: Object,
        couponUsed: Boolean,
        purchaseMethod: String,
    }
)

const Sale = mongoose.model('Sales', salesSchema);

export default Sale;