const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

// // extract text on website
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.shmtranslations.com/');

  
//   await browser.close();
// })();


async function makeWebsiteToPdf(websiteLink,pdfName,pdfDirectory) {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
      path: `${pdfDirectory}/${pdfName}.pdf`,
      format: 'a4'
    }

    if (!fs.existsSync(pdfDirectory)) {
      fs.mkdirSync(pdfDirectory)
    }

    await page.goto(websiteLink, {
        waitUntil: 'networkidle2',
      });
    await page.pdf(options);

    await browser.close();
  }catch(err){
    console.log(err)
  }
}

async function makeWebsiteToImage(websiteLink,pngName,pngDirectory) {
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = {
      path: `${pngDirectory}/${pngName}.png`,
      fullPage: true,
      // omitBackground:true,
    }

    if (!fs.existsSync(pngDirectory)) {
      fs.mkdirSync(pngDirectory)
    }

    await page.goto(websiteLink, {
        waitUntil: 'networkidle2',
      });
    await page.screenshot(options);

    await browser.close();

  }catch(err){
    console.log(err)
  }
}

const websiteLink = 'https://www.shmtranslations.com/';
const name = 'exampleImage1';
const directory = 'image'

// makeWebsiteToImage(websiteLink,name,directory);
// makeWebsiteToPdf(websiteLink,name,directory);