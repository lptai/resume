const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://phuctaile.com/resume/', {waitUntil: 'networkidle2'});
  await page.pdf({path: './build/phuctaile.pdf', format: 'A4'});

  await browser.close();
})();