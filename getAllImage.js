const puppeteer = require('puppeteer');
const fs = require("fs");
const axios = require('axios');

async function getAllImageOfWebsite(websiteLink,imgDir) {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        if (!fs.existsSync(imgDir)) {
            fs.mkdirSync(imgDir)
        }
        
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
        
        imageBank.map((image) => {
            if(image.filename.split('.')[1] == 'jpg' || image.filename.split('.')[1] == 'png'){
                let filename = `./${imgDir}/${image.filename}`
                saveImageToDisk(image.src, filename,image.filename)
            }
        })

        await browser.close();
        
    }catch(err){
        console.log(err)
    }
}

function saveImageToDisk(url,filename,imageName){
    axios({
        method: "get",
        url: url,
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(filename));
        console.log(`Image : ${imageName} has been saved`)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = {
    getAllImageOfWebsite
}