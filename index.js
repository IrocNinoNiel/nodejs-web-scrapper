const puppeteer = require('puppeteer');

// // Create a screen shot of a webpage
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.shmtranslations.com/');
//   await page.screenshot({ path: 'example.png',fullPage:true});
//   await page.screenshot

//   await browser.close();
// })();

// // Create a pdf of a webpage
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.shmtranslations.com/', {
//       waitUntil: 'networkidle2',
//     });
//     await page.pdf({ path: 'website.pdf', format: 'a4' });
  
//     await browser.close();
// })();

// extract text on website
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.shmtranslations.com/');

  

  await browser.close();
})();
