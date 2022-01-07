const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

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

module.exports = {
    makeWebsiteToImage
}