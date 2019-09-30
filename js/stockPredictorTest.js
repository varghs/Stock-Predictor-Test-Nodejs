const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
new Promise((resolve, reject) =>
    {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () => {
            try {
                if (xhr.status !== 200)
                    throw new Error(`request failed with ${xhr.status}`);
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
        xhr.addEventListener("error", reject);
        xhr.open("GET", "https://api.quoine.com/products/1");
        xhr.send();
    })
    .then(response => {
        console.log("Market ask", response.market_ask);
    })
    .catch(error => {
        console.log(error.message);
    });