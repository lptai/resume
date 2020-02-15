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

const request = require('request');
const fs = require('fs');
const path = require('path');

fs.readFile('./build/index.html', 'utf8', function(err, data) {
    var opts = {
        uri: 'https://api.sejda.com/v2/html-pdf',
        headers: {
            Authorization: 'Token: ' + 'api_public_1b813522f642426188bd47e6db9f94c0',
        },
        json: {
            partialContentAllowed: true,
            // urls: 'http://phuctaile.com/resume',
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

    request
        .post(opts)
        .on('error', function(err) {
            return console.error(err);
        })
        .on('response', function(response) {
            if (response.statusCode === 200) {
                response
                    .pipe(fs.createWriteStream('./build/phuctaile.pdf'))
                    .on('finish', function() {
                        console.log('PDF saved to disk');
                    });
            } else {
                return console.error('Got code: ' + response.statusCode);
            }
        });
});
