var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if (this.readyState !== 4) return;
	if (this.status !== 200){
		console.error("Could not load stocks");
	}
  reqListener(this.responseText);
	showSelectedChart();
};
var uid = window.localStorage['userID'];
xhr.open("POST", "/stocks.json", true);
if (!uid){
	uid = '0';
}
xhr.send(JSON.stringify({userID:  uid}));


var selector = document.getElementById('chart-select');
selector.addEventListener('change', showSelectedChart);

function showSelectedChart(){
	switch(selector.value){
		case 'total_value':
			document.getElementById('investment-returns-chart').classList.add('hidden');
			document.getElementById('total-value-chart').classList.remove('hidden');
			document.getElementById('gain-loss-chart').classList.add('hidden');
			document.getElementById('history-chart').classList.add('hidden');
			break;
		case 'gain_loss':
			document.getElementById('investment-returns-chart').classList.add('hidden');
			document.getElementById('total-value-chart').classList.add('hidden');
			document.getElementById('gain-loss-chart').classList.remove('hidden');
			document.getElementById('history-chart').classList.add('hidden');
			break;
		case 'investment_returns':
			document.getElementById('investment-returns-chart').classList.remove('hidden');
			document.getElementById('total-value-chart').classList.add('hidden');
			document.getElementById('gain-loss-chart').classList.add('hidden');
			document.getElementById('history-chart').classList.add('hidden');
			break;
		case 'history':
			document.getElementById('investment-returns-chart').classList.add('hidden');
			document.getElementById('total-value-chart').classList.add('hidden');
			document.getElementById('gain-loss-chart').classList.add('hidden');
			document.getElementById('history-chart').classList.remove('hidden');
		break;
	}
}

function reqListener(data){
  var stocks = JSON.parse(data);
  var colors = {};

	var totalMade = stocks.reduce(function(prev, curr){
		return prev + curr.gain_loss;
	}, 0);

	var totalCost = stocks.reduce(function(prev, curr){
		return prev + curr.total_cost;
	}, 0);

	var totalValue = stocks.reduce(function(prev, curr){
		return prev + curr.market_value;
	}, 0);

  stocks.forEach(function(stock){
    var change = stock.investment_returns / 100.0;
		var maxRed = 255;
    var maxGreen = 183;
		var minBrightness = 100;
		var value = 0;

    var r = 0, g = 0, b = 0;
    if (change > 0) {
      g = maxGreen;
      value = maxGreen - Math.floor(Math.max(Math.min(change * 255, maxGreen), minBrightness));
      r = value;
      b = value;
    } else if (change < 0){
      r = maxRed;
      value = maxRed - Math.floor(Math.max(Math.min(-change * 255, maxRed), minBrightness));
      g = value;
      b = value;
    } else {
      r = b = g = value;
    }

		var name = stock.ticker;
		var count = 1;
		while (name in colors){
			name = stock.ticker + " (" + count + ")"
			count++;
		}
		stock.unique_name = name;
		colors[name] = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  });

  var pieChart = c3.generate({
      bindto: '#total-value-chart',
      data: {
          columns: stocks.map(function(stock){
            return [stock.unique_name, stock.market_value];
          }),
          colors: colors,
          type : 'donut'
      },
      tooltip: {
        format: {
            value: function (value, ratio, id) {
                var format = d3.format('$,.2f');
                return format(value);
            }
        }
      },
			donut: {
				title: d3.format('$,.2f')(totalValue)
			}
  });



	var investmentReturns = c3.generate({
		bindto: '#investment-returns-chart',
		title: {
			text: "Total investment return: " + Math.round(totalMade / totalCost * 100 * 100) / 100 + "%"
		},
		data: {
				columns: stocks.map(function(stock){
					return [stock.unique_name, stock.investment_returns];
				}),
				type: 'bar',
				labels: {
					format: function(value, ratio, id){
						return ratio;
					}
				},
				colors: colors
		},
		legend: {
			show: false
		},
		bar: {
				width: 100
		},
		tooltip: {
			format: {
					value: function (value, ratio, id) {
							return Math.round(value * 100) / 100 + "%";
					}
			}
		},
		grid: {
			y: {
					lines: [{value: 0}]
			}
		},
		axis: {
			x: {
					tick: {
						values: []
					}
			}
	}
});


	var history = ['gain/loss'];
	var time = ['time'];

	var len = stocks.length;
	var recordLen = 0;
	if(len > 0){
		recordLen = stocks[0].records.length;
	}

	var formatTime = d3.timeFormat("%B %d, %Y");

	for (var i = 0; i < recordLen; i++){
		var value = 0;

		time.push(stocks[0].records[i].time);


		stocks.forEach(function(stock){
			var record = stock.records[i];
			if (!record){
				return;
			}
			if(record.close){
				value += record.close * stock.shares - stock.total_cost;
			} else {
				value += stock.gain_loss;
			}
		});

		history.push(value);
	}

	var total_change = history[history.length - 1] - history[1];
	var percent_change = total_change / history[1] * 100;
	var title = "";
	var changeString =  Math.abs(Math.round(percent_change * 100) / 100) + "% (" + d3.format('$,.2f')(total_change) + ") since " + formatTime(time[1]);

	if (percent_change > 0){
		title = "Up " + changeString;
	} else if (percent_change == 0){
		title = "No change since " + timeFormat(time[1]);
	} else {
		title = "Down " + changeString;
	}

	var historyChart = c3.generate({
		bindto: '#history-chart',
		title: {
			text: title
		},
		data: {
			type: 'area',
			x: 'time',
			columns: [history, time],
			colors: {
				'gain/loss': 'rgb(0, 200, 0)'
			}
		},
		tooltip: {
			format: {
					value: function (value, ratio, id) {
							var format = d3.format('$,.2f');
							return format(value);
					}
			}
		},
		legend: {
			show: false
		},
		grid: {
			y: {
					lines: [{value: 0}]
			}
		},
		axis: {
			x: {
					tick: {
						type: 'timeseries',
						format: function(x){
							return formatTime(new Date(x));
						}
					}
			}
	}
	});


  var gainLossChart = c3.generate({
      bindto: '#gain-loss-chart',
			title: {
				text: "Total gain / loss: " + d3.format('$,.2f')(totalMade)
			},
      data: {
          columns: stocks.map(function(stock){
            return [stock.unique_name, stock.gain_loss];
          }),
          type: 'bar',
          labels: {
            format: function(value, ratio, id){
              return ratio;
            }
          },
          colors: colors
      },
      legend: {
        show: false
      },
      bar: {
          width: 100
      },
      tooltip: {
        format: {
            value: function (value, ratio, id) {
                var format = d3.format('$,.2f');
								return format(value);
            }
        }
      },
      grid: {
        y: {
            lines: [{value: 0}]
        }
      },
      axis: {
        x: {
            tick: {
              values: []
            }
        }
    }
  });

}
