const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');



const app = express();
const HTTP_PORT = 6500;

const status = {
    notFound: 404,
    serverError: 500
}



// middleware

app.use(express.json());
app.use(cors);



// start server

app.listen(HTTP_PORT, () => {
    console.log('Listening on port: ' + HTTP_PORT);
});
