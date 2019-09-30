const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

// completion callback
xhr.addEventListener("load", () => {
    console.log(xhr);
    console.log(xhr.responseText);
    const data = JSON.parse(xhr.responseText);
    console.log(data.market_ask);
});

xhr.open("GET", "https://api.quoine.com/products/1");
xhr.send();