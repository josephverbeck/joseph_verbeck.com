var express = require('express')
var router = express.Router();
var download = require('./download');

router.get('/', function(req, res, next){
    res.render('about');
});

router.get('/download', download);

module.exports = router;