// const puppeteer = require('puppeteer');
// const path = require("path");
// const filePath = path.resolve(__dirname, './build/index.html');

// (async () => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(`file:///${filePath}`, { waitUntil: 'networkidle2' });
//         await page.pdf({ path: `./build/phuctaile.pdf`, format: 'A4' });

//         await browser.close();
//     } catch (e) {
//         console.log(e);
//     }
// })();

const axios = require('axios');
const fs = require('fs');

fs.readFile('./build/index.html', 'utf8', function(err, data) {
    var config = {
        method: 'post',
        url: 'https://api.sejda.com/v2/html-pdf',
        headers: {
            Authorization: 'Token: ' + 'api_public_1b813522f642426188bd47e6db9f94c0',
        },
        responseType: 'stream',
        data: {
            partialContentAllowed: true,
            htmlCode: data,
            pageSize: '',
            pageOrientation: 'auto',
            viewportWidth: 1500,
            pageMargin: 0,
            pageMarginUnits: 'px',
            delay: 0,
            hideNotices: true,
            scrollPage: true,
        },
    };

    axios(config)
        .then(res => res.data)
        .then(data => {
            data.pipe(fs.createWriteStream('./build/phuctaile.pdf')).on('finish', function() {
                console.log('PDF saved to disk');
            });
        })
        .catch(error => {
            console.log('error status', error.response.status);
        });
});
