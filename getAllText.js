const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

async function getAllTextOfWebsite(websiteLink,txtName,txtDirectory) {
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      if (!fs.existsSync(txtDirectory)) {
        fs.mkdirSync(txtDirectory)
      }
  
        await page.goto(websiteLink, {
            waitUntil: 'networkidle2',
        });
      
        const extractedText = await page.$eval('*', (el) => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNode(el);
            selection.removeAllRanges();
            selection.addRange(range);
            return window.getSelection().toString();
        });
        
        const txtPath = path.join(txtDirectory, `${txtName}.txt`)
        fs.writeFileSync(txtPath, extractedText,{ flag: 'a+' })


        await browser.close();
        console.log('-----------------------------------------')
        console.log(`| Website Text has been copied succesfully`)
        console.log(`| File Directory - ${path.join(__dirname,txtDirectory)}`)
        console.log(`| File Name - ${path.basename(txtPath)}`)
        console.log('-----------------------------------------')
        
    }catch(err){
      console.log(err)
    }
  }

module.exports = {
    getAllTextOfWebsite
}