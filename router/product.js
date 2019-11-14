const express = require("express");
const productRouter = express.Router();
const productModel = require("../model/products");

//add
productRouter.post("/", (req,res)=>{
    const {image,title,category,type_product,sold_out_quantity,description,price,quantity,detail} = req.body;
    productModel.create({image,title,category,type_product,sold_out_quantity,description,price,quantity,detail
    }).then(productCreated => {
        console.log(productCreated);
        res.status(201).json({
            success : true,
            data : productCreated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success : false,
            error,
        });
    });
} );
//get by ID
productRouter.get("/:id",(req,res)=>{
 const id = req.params.id;
 productModel.findById(id).then(product=>{
     res.json({
         success : true,
         data : product,
     })
 }).catch(err=>{
     console.log(err);
     res.status(500).json({
         success : false,
         error,
     })
 })
});
//get all
productRouter.get("/",(req,res)=>{
    const {page = 1, pageSize = 12} = req.query;
    
    productModel.find({}).limit(Number(pageSize))
    .skip((Number(page) - 1)*Number(pageSize))
    .then(productList => {
        productModel.count({}).then(total => {
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data: productList,
            });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
});

//getByCategory
productRouter.get("/:category", (req,res)=>{
    const {page = 1, pageSize = 12} = req.query;
    productModel.find({category : req.params.category})
    .limit(Number(pageSize))
    .skip((Number(page)-1)*Number(pageSize))
    .then(productList => {
        productModel.count({}).then(total => {
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data: productList,
            });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
});

//getBestSeller
productRouter.get("/:category/bestSeller",(req,res)=>{
    
    productModel.find({category : req.params.category}).sort("sold_out_quantity").limit(4)
    .then(productList => {
            res.json({
                success: true,
                data: productList,
            });       
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
});

//getbyA->Z
productRouter.get("/:category/sortByAlphabet/:option",(req,res)=>{
    const {page = 1, pageSize = 12} = req.query;
    productModel.find({category : req.params.category}).sort([["title",req.params.option]])
    .limit(Number(pageSize))
    .skip((Number(page)-1)*Number(pageSize))
    .then(productList => {
        productModel.count({}).then(total => {
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data: productList,
            });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
});


//getByPrice
productRouter.get("/:category/sortByPrice/:option",(req,res)=>{
    const {page = 1, pageSize = 12} = req.query;
    productModel.find({category : req.params.category}).sort([["price",req.params.option]])
    .limit(Number(pageSize))
    .skip((Number(page)-1)*Number(pageSize))
    .then(productList => {
        productModel.count({}).then(total => {
            res.json({
                success: true,
                totalPage: Math.ceil(total/Number(pageSize)),
                data: productList,
            });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    });
});
  


//update
productRouter.put("/:id", (req,res)=>{
    productModel.findByIdAndUpdate(req.params.id, req.body).then(productUpdated =>{
        res.json({
            success : true,
            data : productUpdated,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success : false,
            error,
        });
    });
});

//delete
productRouter.delete("/:id",(req,res)=>{
    productModel.findByIdAndRemove(req.params.id).then(productDeleted =>{
        res.json({
            success : true,
            data : productDeleted,
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            success : false,
            error,
        });
    });
});

module.exports = productRouter;