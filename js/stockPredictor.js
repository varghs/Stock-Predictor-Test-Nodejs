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
    
      const scaledData = dailyStats.map(scaleDown);
    
      const trainingData = [
        scaledData.slice(0, 5),
        scaledData.slice(5, 10),
        scaledData.slice(10, 15),
        scaledData.slice(15, 20),
      ];
    
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
    
      console.log(JSON.stringify(net.forecast([
        trainingData[0][0],
        trainingData[0][1],
        trainingData[0][2],
        trainingData[0][3],
        trainingData[0][4],
        trainingData[1][0],
        trainingData[1][1],
        trainingData[1][2],
        trainingData[1][3],
        trainingData[1][4],
        trainingData[2][0],
        trainingData[2][1],
        trainingData[2][2],
        trainingData[2][3],
        trainingData[2][4],
        trainingData[3][0],
        trainingData[3][1],
        trainingData[3][2],
        trainingData[3][3],
        trainingData[3][4]
      ], 3).map(scaleUp)));
  });
