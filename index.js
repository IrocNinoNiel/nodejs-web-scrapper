const {
  makeWebsiteToPdf
} = require('./makePdf')

const {
  makeWebsiteToImage
} = require('./makeImage')

const {
  getAllTextOfWebsite
} = require('./getAllText')

const {
  getAllImageOfWebsite
} = require('./getAllImage')


const websiteLink = 'https://stocksnap.io/';
const name = 'exampleTxt';
const directory = 'Text'

// makeWebsiteToImage(websiteLink,name,directory);
// makeWebsiteToPdf(websiteLink,name,directory);
// getAllTextOfWebsite(websiteLink,name,directory);
getAllImageOfWebsite(websiteLink,name,directory)
