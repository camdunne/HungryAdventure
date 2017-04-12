const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const scrapeIt = require('scrape-it');
dotenv.config();

const pg = require('./config/database.js');

const app = express();
require('./config/routes.js')(app, express);


app.use(express.static(path.join(`${__dirname}/../build`)));
app.use(express.static(path.join(`${__dirname}/../public`)));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/../public`, 'index.html'));
});

const server = app.listen(8888, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// SCRAPE-IT EXAMPLE
// scrapeIt("https://www.viator.com/search/new%20york%20city", {
// pages: {
//   listItem: ".media",
//
//   data: {
//     title: "a",
//     price: ".price-amount",
//     url: {
//     selector: "a",
//     attr: "href"
//       }
//     }
//   }
// }).then(page => {
//     console.log(page);
// });
