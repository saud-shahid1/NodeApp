require('dotenv').config();
require('./dbConfig/db');
var express = require('express');
const authRouter =  require('./routes/auth')
var app = express();
const port = 8000;

app.use(express.json());

app.use('/api/auth', authRouter);



app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`)
})


module.exports = app;
