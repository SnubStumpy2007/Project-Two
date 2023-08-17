const express = require('express');
const bcrypt = require('bcrypt');
const { UserAccount } = require('../models');
const router = express.Router();

console.log("Imported UserAccount:", UserAccount);


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { user_name, first_name, last_name, email, pwd_hash } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(pwd_hash, 10);

        const user = await UserAccount.create({
            UserName: user_name,
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            Password: hashedPassword
        });
        
        req.session.userId = user.id;
        console.log("User registration successful. Redirecting to login...");
        res.redirect('/login'); 
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send(`Registration error: ${error.message}`);
    }
});

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', async (req, res) => {
    try {
        const user = await UserAccount.findOne({ where: { UserName: req.body.user_name } });
        
        if (user && await bcrypt.compare(req.body.pwd_hash, user.Password)) {
            req.session.userId = user.id;
            res.redirect('/');  
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send(`Login error: ${error.message}`);
    }
});

module.exports = router;
