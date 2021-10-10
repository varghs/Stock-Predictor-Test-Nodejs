const axios = require("axios");
const brain = require("brain.js");
let ticker = "AMZN";
axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}`)
  .then((response) => {
    var a = response.data;
    var dailyStats = a.historical.reverse();
    // console.log(dailyStats)
    function scaleDown(step) { // normalize
      return {
          open: step.open / 138,
          high: step.high / 138,
          low: step.low / 138,
          close: step.close / 138
      };
    }
  
    function scaleUp(step) { // denormalize
        return {
          open: step.open * 138,
          high: step.high * 138,
          low: step.low * 138,
          close: step.close * 138
      };
    }

    // format data
    function format(arr) {
      const toReturn = []
      for(let i= 0; i<arr.length; i+=5) {
          toReturn.push(arr.slice(i, i+5))
      }
      if(toReturn[toReturn.length-1].length == 1) {
        const last = toReturn.pop()
        toReturn[toReturn.length-1].concat(last)
      }
      return toReturn
    }

  
    const scaledData = dailyStats.map(scaleDown);
  
    const trainingData = format(scaledData)
  
    const net = new brain.recurrent.LSTMTimeStep({
      inputSize: 4,
      hiddenLayers: [8, 8],
      outputSize: 4
    });
  
    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02,
      // log: (stats) => console.log(stats)
    });
  
    // console.log(scaleUp(net.run(trainingData[0])));
  
    console.log(JSON.stringify(net.forecast(scaledData, 3).map(scaleUp)));
  });
