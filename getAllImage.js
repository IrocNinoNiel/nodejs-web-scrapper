const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');
const axios = require('axios');

async function getAllImageOfWebsite(websiteLink,txtName,txtDirectory) {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Get the page url from the user
        let baseURL = process.argv[2] ? process.argv[2] : websiteLink
  
        await page.goto(websiteLink, {
            waitUntil: 'networkidle2',
        });
        
        await page.waitForSelector('body')

        const imageBank = await page.evaluate(() => {
            let imgTags = Array.from(document.querySelectorAll('img'))

            let imageArray = []

            imgTags.map((image) => {
                let src = image.src

                let srcArray = src.split('/')
                let pos = srcArray.length - 1
                let filename = srcArray[pos]

                imageArray.push({
                    src,
                    filename
                })
            })

            return imageArray
        })
        
        await browser.close();

        // console.log(imageBank)
        // imageBank.map((image) => {
        //     let filename = `./images/${image.filename}`
        //     saveImageToDisk(image.src, filename)
        // })
        
    }catch(err){
        console.log(err)
    }
}

function saveImageToDisk(url,filename){
    axios.get(url)
    .then(res => {
        fs.createWriteStream(filename);
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = {
    getAllImageOfWebsite
}