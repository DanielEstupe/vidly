const express = require('express');
const router = express.Router();

// Principal view
router.get('/', (req, res) => {
    res.render('index', {
        title: "Vidly API",
        message: "This a simple API written in NodeJS"
    });
});

module.exports = router;