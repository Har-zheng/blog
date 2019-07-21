var express = require('express');
const app =new express()
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3009,'127.0.0.1');
