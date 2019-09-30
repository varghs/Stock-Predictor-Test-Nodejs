const axios = require('axios')

axios.get('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL')
  .then((response) => {
    var a = response.data;
    console.log(a.historical.reverse())
  });