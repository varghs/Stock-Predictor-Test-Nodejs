<h1 align="center">Stock Predictor for <code>Node.js</code></h1>

This is a neural network that aims to predict statistics for specific stocks.
The project requires the `brain.js` and `axios` and `minmaxscaler` packages to run correctly.

The program reaches out to the [FMP](https://financialmodelingprep.com) API to fetch stock history data for a certain company, then serializes the data and feeds it into a neural network powered by [Brain.js](https://brain.js.org). The network analyzes the data given and generates a forecast for the company's future stock statistics.

This project is open to the public and as such, anyone is welcome to make a pull request if they would like to contribute.
