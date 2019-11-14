const express = require("express");
const BillRouter = express.Router();
const BillModel = require("../model/bills");

BillRouter.post("/", (req, res) => {
    console.log(req.body);
    const product_list = req.body.list_product;
    const user = req.body.user;
    const totalPrice = req.body.totalPrice;

    BillModel.create({
        product_list, user, totalPrice
    }).then(billCreated => {
        console.log(billCreated);
        res.status(201).json({
            success: true,
            data: billCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
})

module.exports = BillRouter;
