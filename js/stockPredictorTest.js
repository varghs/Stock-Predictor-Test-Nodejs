var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var myGlobalVars = {}
let request = new XMLHttpRequest()
let ticker = "AAPL"
request.open('GET', `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL`,true)
request.onload = function() {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response)
  console.log(data)
}

request.send()