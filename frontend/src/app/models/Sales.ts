export interface Sales {
  _id: string;
  items: [{
    name: String,
    tags: [String],
    price: {$numberDecimal: String},
    quantity: Number
  }];
  customer: {gender: String, age: Number, email: String, satisfaction: Number};
  saleDate: String,
  storeLocation: String;
  purchaseMethod: String;
  couponUsed: Boolean;
}
