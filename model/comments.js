  const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UserSchema"
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProductSchema"
    },
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = mongoose.model("CommentSchema", CommentSchema);
