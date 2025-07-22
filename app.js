require('dotenv').config();
var express = require('express');
const authRouter =  require('./routes/auth')
var app = express();
const port = 3000

app.use(express.json());

app.use('/api', authRouter )



app.listen(port, '0.0.0.0', () => {
  console.log(`App listening on port ${port}`)
})


module.exports = app;
