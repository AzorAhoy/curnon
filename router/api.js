const express = require('express');
const ApiRouter = express.Router();
const UserRouter = require("./user");
const ProductRouter = require("./product");
const CommentRouter = require("./comment");
const AuthRouter = require("./auth");
const BillRouter = require("./bill")
//const userRouter = require("./")
ApiRouter.get('/', (req, res) => {
    res.send("API");
})

ApiRouter.use('/user', UserRouter);
ApiRouter.use('/product', ProductRouter);
ApiRouter.use('/comment', CommentRouter);
ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/bill', BillRouter);

module.exports = ApiRouter;