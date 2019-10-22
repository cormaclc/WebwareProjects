var https = require('https');

function getStock(ticker, callback, errorCallback){
	https.get("https://api.iextrading.com/1.0/stock/" + ticker + "/batch?types=quote,chart&range=1m&last=1", (res) => {
		let data = '';

	  res.on('data', (chunk) => {
	    data += chunk;
	  });

	  res.on('end', () => {
			try {
		    var stock = JSON.parse(data);
				var finalStock = {
					ticker: stock.quote.symbol,
					name: stock.quote.companyName,
					currentPrice: stock.quote.latestPrice,
					records: []
				}

				stock.chart.forEach((day) => {
					var dayValues = {
						time: Date.parse(day.date),
						close: day.close,
						open: day.open
					}
					finalStock.records.push(dayValues);
				})
				callback(finalStock);
			} catch (error){
				errorCallback(error.message);
			}
	  });

	}).on("error", (err) => {
  	errorCallback(err.message)
	});
}

function getAllStocks(tickers, callback, errorCallback){
	var ticker_count = tickers.length;
	var finished = 0;
	var stock_data = [];

	var intermediateCallback = function(res){
		finished++;
		stock_data.push(res);
		if (finished == ticker_count) {
			callback(stock_data);
		}
	};

	var intermediateErrorCallback = function(res){
		finished++;
		errorCallback(res);
		if (finished == ticker_count) {
			callback(stock_data);
		}
	}

	for (var i = 0; i < tickers.length; i++){
		getStock(tickers[i], intermediateCallback, intermediateErrorCallback);
	}
}


function getStocks(allStocks, callback, errorCallback){
	getAllStocks(allStocks.map(s => s.ticker), function (data) {
			var stocks = combineStockData(allStocks, data);
			callback(stocks);
	}, errorCallback);
}

function combineStockData(dbStocks, currentStocks){
  var stocks = [];
  for(var i = 0; i < dbStocks.length; i++){
    stocks[i] = {
      price: Number(dbStocks[i].price),
      ticker: dbStocks[i].ticker,
      shares: Number(dbStocks[i].shares),
			_id: dbStocks[i]._id
    };
		var found = false;
    currentStocks.forEach(function(currentStock){
      var ticker = stocks[i].ticker;
      if (ticker === currentStock.ticker) {
				found = true;
        stocks[i].currentPrice = currentStock.currentPrice;
        stocks[i].name = currentStock.name;
				stocks[i].records = currentStock.records;
				stocks[i].total_cost = stocks[i].shares * stocks[i].price;
				stocks[i].market_value = stocks[i].shares * stocks[i].currentPrice;
				stocks[i].gain_loss = stocks[i].market_value - stocks[i].total_cost;
				stocks[i].investment_returns = (stocks[i].gain_loss / stocks[i].total_cost) * 100;
      }
    });

		if(!found){
			stocks[i].currentPrice = 0;
			stocks[i].name = "Unknown ticker";
			stocks[i].records = [];
			stocks[i].total_cost = stocks[i].shares * stocks[i].price;
			stocks[i].market_value = 0;
			stocks[i].gain_loss = 0;
			stocks[i].investment_returns = 0;
		}

  }
  return stocks;
}

module.exports = {
	'getStocks': getStocks
};
