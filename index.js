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



// route

app.get('/character/:charName', (req, res) => {
    loadCharData(req.params.charName)
        .then(charData => {
            res.send(charData);
        })
        .catch(err => {
            res.status(status.serverError).send(err);
        })
});



// helpers

async function loadHTML(url) {
    try {
        let res = await axios(url);
        return cheerio.load(res.data);
    } catch (err) {

        console.error('[loadHTML] Error: ' + err);
        throw err;
    }
}

async function loadCharData(charName) {

    const url = `https://m-lostark.game.onstove.com/Profile/Character/${charName}`;

    try {

        const $ = await loadHTML(url);
        
        // TODO: check no character 
        // <script> alert('캐릭터 정보가 없습니다. 캐릭터명을 확인해주세요.'); location.replace('/Profile/Character') </script>

        // TODO: check maintenance

        const charData = {
            charLevel: $('#myinfo__character--button2').text().split(' ')[0],
            charName: $('#myinfo__character--button2').text().split(' ')[1]
        }

        return charData;

    } catch (err) {

        console.error('[loadCharData] Error: ' + err);
        throw new Error('unknown', 'Failed to load character data.');
    }
}



// start server

app.listen(HTTP_PORT, () => {
    console.log('Listening on port: ' + HTTP_PORT);
});
