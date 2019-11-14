const express = require("express");
const CommentRouter = express.Router();

const commentModel = require("../model/comments");

// CRUD
// Create
CommentRouter.post("/", (req, res) => {
  const { content, user, product, rating, name, title } = req.body;

  commentModel
    .create({ content, user, product, rating, name, title })
    .then(commentCreated => {
      console.log(commentCreated);
      res.status(201).json({
        success: true,
        data: commentCreated
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      });
    });
});

// Get list
CommentRouter.get("/", (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;

  commentModel
    .find({})
    .populate("user", {
      password: 0,
      __v: 0,
      _id: 0
    })
    .populate("product", {
      _id: 0
    })
    .limit(Number(pageSize))
    .skip((Number(page) - 1) * Number(pageSize))
    .then(commentList => {
      // res.json({
      //   success: true,
      //   data: commentList
      // });
      commentModel.count({}).then(total => {
        res.json({
          success: true,
          totalPage: Math.ceil(total / Number(pageSize)),
          data: commentList
        });
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      });
    });
});

// Get one
// CommentRouter.get("/:id", (req, res) => {
//   commentModel
//     .findById(req.params.id)
//     .populate("UserSchema", {
//       password: 0,
//       __v: 0,
//       _id: 0
//     })
//     .populate("ProductSchema", {
//       _id: 0
//     })
//     .then(comment => {
//       res.json({
//         success: true,
//         data: comment
//       });
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         error
//       });
//     });
// });

// Get one
CommentRouter.get("/:productId", (req, res) => {
  //const { page = 1, pageSize = 4 } = req.query;

  commentModel
    .find({ product: req.params.productId })
    .populate("user", {
      password: 0,
      __v: 0,
      _id: 0
    })
    .populate("product", {
      _id: 0
    })
    // .limit(Number(pageSize))
    // .skip((Number(page) - 1) * Number(pageSize))
    .then(commentList => {
      res.json({
        success: true,
        //totalPage: Math.ceil(total / Number(pageSize)),
        data: commentList
      });
      // const num = commentModel.count({});
      // commentModel.count({}).then(total => {
      //   res.json({
      //     success: true,
      //     totalPage: Math.ceil(num / Number(pageSize)),
      //     data: commentList
      //   });
      // })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      });
    });
});


// Update
CommentRouter.put("/:id", (req, res) => {
  commentModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(commentUpdated => {
      res.json({
        success: true,
        data: commentUpdated
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      });
    });
});

// Delete
CommentRouter.get("/:id", (req, res) => {
  commentModel
    .findByIdAndRemove(req.params.id)
    .then(commentDeleted => {
      res.json({
        success: true,
        data: commentDeleted
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error
      });
    });
});

module.exports = CommentRouter;