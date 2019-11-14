const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BillSchema = new Schema({
    product_list: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: "ProductSchema",
        },
        quantity:{
            type : Number,
            default : 0,
        },
    }],

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserSchema",
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0,

    },
},
    {
        timestamps: true, // createdAt, updatedAt
    }
)
module.exports = mongoose.model("BillSchema", BillSchema)