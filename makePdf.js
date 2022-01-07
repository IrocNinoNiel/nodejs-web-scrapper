const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

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

module.exports = {
    makeWebsiteToPdf
}