require('dotenv').config(); //read .env properties

const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./db/config');
const app = express();
const conn = dbConnect();

app.use(express.static('public')); //public path    
app.use(cors()); //cors
app.use(express.json()); //reader and parser body
app.use('/api/auth', require('./routes/auth')); //routes

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});