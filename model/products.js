const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    image:{
        type: Array,
    },

    title:{
        type : String,
        required : true,
    },
    category:{
        type:String,
        required : true,
    },
    type_product:{
        type:String,
        required: true,
    },
    sold_out_quantity:{
        type : Number,
        default : 0,

    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type : Number,
        required : true
    },
    quantity:{
        type: Number,
        required : true,
    },
    detail:{
        duongKinh : String,
        doDay : String,
        chatLieuVo: String,
        kichCoDay : String,
        chatLieuDay : String,
        loaiMay : String,
        matKinh : String,
        chongNuoc : String,
    },
})

module.exports = mongoose.model('ProductSchema',ProductSchema);