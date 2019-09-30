const fetch = require('node-fetch');
let data = [];

fetch("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line")
    .then(response => response.json())
    .then(result => data.push(result));

console.log(data)