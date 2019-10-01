var express = require('express')
var router = express.Router();
var path = require('path');

router.get('/download', function(req, res, next){
    const resume = `${path.resolve('./public')}/Joseph_Verbeck.pdf`;
    res.download(resume);
});

module.exports = router;