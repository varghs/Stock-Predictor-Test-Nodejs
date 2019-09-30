const fetch = require('node-fetch');


fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line')
    .then(res => res.json())
    .then(json => console.log(json));