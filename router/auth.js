const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRouter = express.Router();

const jwtSecret = "sadu&^123i897au&Y*&";

const userModel = require('../model/users');

// Authentication
// Login
AuthRouter.post('/login', (req, res) => {
    // TODO:
    // - Get username, password from request
    // - Check if user with username exist
    // - Compare password
    // - 
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ success: 0, message: 'Thiếu username hoặc password!' });
    }

    userModel.findOne({ username })
        .then(userFound => {
            if (!userFound || !userFound._id) {
                res.json({ success: 0, message: 'Không tồn tại người dùng có username này!' });
            } else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    // Login with sesssion
                    // req.session.user = {
                    //     username,
                    //     id: userFound._id,
                    // };

                    const access_token = jwt.sign({ username, id: userFound._id }, jwtSecret)

                    res.json({
                        success: 1,
                        message: 'Đăng nhập thành công!',
                        access_token,
                        user: {
                            username,
                            id: userFound._id,
                        }
                    });
                } else {
                    res.json({ success: 0, message: 'Sai mật khẩu!' });
                }
            }
        }).catch(err => {
            res.json({ success: 0, message: 'Đã có lỗi xảy ra!' });
        });
});

// Logout with session
// AuthRouter.delete('/logout', (req, res) => {
//     req.session.user = null;
//     req.session.destroy();
//     res.json({ success: 1, message: 'Đăng xuất thành công!' });
// });

AuthRouter.get('/check', (req, res) => {
    const access_token = req.query.access_token;
   // console.log(access_token);
    //console.log(req.session);

    if (access_token && jwt.verify(access_token, jwtSecret)) {
        res.send({
            success: 1,
            message: 'Người dùng đã đăng nhập',
            user: jwt.verify(access_token, jwtSecret)
        });
    } else {
        res.send({
            success: 0,
            message: 'Người dùng chưa đăng nhập'
        });
    }
    // if (req.session.user) {
    //     res.send({
    //         success: 1,
    //         message: 'Người dùng đã đăng nhập',
    //         user: req.session.user
    //     });
    // } else {
    //     res.send({
    //         success: 0,
    //         message: 'Người dùng chưa đăng nhập'
    //     });
    // }
});

module.exports = AuthRouter;