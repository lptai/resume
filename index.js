const puppeteer = require('puppeteer');
const path = require("path");
const filePath = path.resolve(__dirname, './build/index.html');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file:///${filePath}`, { waitUntil: 'networkidle2' });
        await page.pdf({ path: `./build/phuctaile.pdf`, format: 'A4' });

        await browser.close();
    } catch (e) {
        console.log(e);
    }
})();
