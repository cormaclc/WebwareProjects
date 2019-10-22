var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , ejs = require('ejs')
  , mongoose = require('mongoose')
  , Stock = require("./public/models/stock")
  , User = require("./public/models/user")
  , {parse} = require('querystring')
  , stock_finder = require('./public/js/stock_finder')
  , store = require('store')
  , bcrypt = require('bcrypt-nodejs')
  , port = 8080;

// For bcrypt
const saltRounds = 10;

// Connect to remote mongoDB
mongoose.connect("mongodb://Admin:IWO9PZmne8vio@ds141942.mlab.com:41942/wwa22018", { useNewUrlParser: true });

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url);

  if(req.method === 'POST') {
      switch(uri.pathname) {
          case '/addstock':
             addStock(req, res);
             break;
         case '/stocks.json':
            sendUserStocks(req, res);
            break;
         case '/new':
             createRecord(req, res);
             break
         case '/login':
             login(req, res);
             break
         case '/register':
             register(req, res);
             break
          case '/stocks':
              getStocks(req, res);
              break
          case '/delete':
              deleteStock(req, res);
              break
          default:
              break;
      }
  } else {
      switch (uri.pathname) {
          case '/':
              sendFile(res, 'public/index.html')
              break
          case '/index.html':
              sendFile(res, 'public/index.html')
              break
          case '/css/style.css':
              sendFile(res, 'public/css/style.css', 'text/css')
              break
          case '/css/material.css':
              sendFile(res, 'public/css/material.css', 'text/css')
              break
          case '/js/scripts.js':
              sendFile(res, 'public/js/scripts.js', 'text/javascript')
              break
          case '/js/chart.js':
              sendFile(res, 'public/js/chart.js', 'text/javascript')
              break
          case '/js/stocks.js':
              sendFile(res, 'public/js/stocks.js', 'text/javascript')
              break
          case '/libs/c3.js':
              sendFile(res, 'public/libs/c3.min.js', 'text/javascript')
              break
          case '/libs/c3.css':
              sendFile(res, 'public/libs/c3.min.css', 'text/css')
              break
          case '/login':
              sendEJS(res, 'public/views/login.ejs');
              break
          case '/register':
              sendEJS(res, 'public/views/register.ejs');
              break
          case '/css/homepage.css':
              sendFile(res, 'public/css/homepage.css', 'text/css')
              break
          case '/css/login.css':
              sendFile(res, 'public/css/login.css', 'text/css')
              break
          case '/stocks':
              sendEJS(res, 'public/views/stocks.ejs');
              break
          case '/stocks.json':
              getUserStocks(undefined);
              break;
          case '/addstock':
              sendEJS(res, 'public/views/addstock.ejs', {emptyfields: false});
              break;
          case 'public/':
              break;
          default:
              res.end('404 not found')
      }
  }
});

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines
// NOTE: this is an ideal place to add your data functionality
//

function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': contentType})
        res.end(content, 'utf-8')
    })

}

function sendJSON(res, json) {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(json), 'utf-8');
}

function sendEJS(res, filename, templateParams) {
    fs.readFile(filename, 'utf-8', function (error, content) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(ejs.render(content, templateParams), 'utf-8');
    });
}

function getUserStocks(res, uid){
  Stock.find({userID: uid}, (err, allStocks) => {
      if (err) {
          // console.log(err);
          sendJSON(res, []);
      } else {
          stock_finder.getStocks(allStocks, data => sendJSON(res, data), function(err){});
      }
  });
}

function sendUserStocks(req, res){
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      let parsed = JSON.parse(body);
      getUserStocks(res, parsed.userID);
  });
}

function login(req, res) {
    // Parse request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsed = JSON.parse(body);
        let username = parsed["username"];
        let password = parsed["password"];
        // Verify login
        User.find({username: username}, (err, user) => {
            if (user === undefined || user.length == 0) {
                // Username does not exist
                res.writeHead(401, {'Content-type': 'application/json'});
                res.end();
            } else {
                // Check password
                bcrypt.compare(password, user[0].password, function(err, bres) {
                    if(bres === true) {
                        // Successful login, retrieve data for results page
                        res.writeHead(200, {'Content-type': 'application/json'});
                        res.end(JSON.stringify(user[0]._id));
                    } else {
                        // Incorrect password
                        res.writeHead(401);
                        res.end();
                    }
                });
            }
        });
    });
}

function createRecord(req, res) {
    if(typeof store.get('user') != 'undefined') {
        // User has been authenticated
        // Parse request body
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let parsedBody = parse(body);
            let ticker = parsedBody["ticker"];
            let shares = parsedBody["shares"];
            let price = parsedBody["price"];
            // let date = parsedBody["date"];
            let userID = store.get('user').id;

            console.log(ticker, shares, price, userID);
            Stock.create({ticker: ticker, shares: shares, price: price, userID: userID}, (err, newStock) => {
                console.log("Created");
            });
        });
    } else {
        // User is not logged in
        console.log("User is not logged in");
    }
}

function register(req, res) {
    // Parse request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsedBody = JSON.parse(body);

        let username = parsedBody["username"];
        let password = parsedBody["password"];

        // Ensure username is unique
        User.find({username: username}, (err, user) => {
            if (user !== undefined && user.length > 0) {
                // Username already exists
                res.writeHead(409);
                res.end();
            } else {
                // Add user to database
                bcrypt.hash(password, null, null, function(err, hash) {
                    User.create({username: username, password: hash}, (err, newUser) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // Successful creation
                            res.writeHead(200, {'Content-type': 'application/json'});
                            res.end(JSON.stringify(newUser._id));
                        }
                    });
                });
            }
        });
    });
}

function addStock(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsedBody = JSON.parse(body);
        let ticker = parsedBody["ticker"];
        let shares = parsedBody["shares"];
        let price = parsedBody["price"];
        let userID = parsedBody["userID"];
        console.log("Received: " + userID);
        if (ticker === '' || shares === '' || price === '') {
            res.writeHead(401, {'Content-type': 'application/json'});
            res.end();
        } else {
            Stock.create({ticker: ticker, shares: shares, price: price, userID: userID}, (err, newlyCreated) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, {'Content-type': 'application/json'});
                    res.end(JSON.stringify(userID));
                    /*
                  let allStocks;
                    Stock.find({}, (err, allStocks) => {
                        if (err) {
                            console.log(err);
                        } else {
                            stock_finder.getStocks(allStocks, function (data) {
                                sendEJS(res, 'public/views/stocks.ejs', {stocks: data});
                            }, console.log);
                        }
                    });
                    */
                }
            });
        }
    });
}

function getStocks(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsed = JSON.parse(body);
        let userID = parsed["userID"];
        if(typeof userID !== undefined) {
            Stock.find({userID: userID}, (err, allStocks) => {
                if (err) {
                    console.log(err);
                } else {
                    if(allStocks.length < 1) {
                        res.writeHead(200, {'Content-type': 'application/json'});
                        res.end(JSON.stringify([]));
                    } else {
                        // Retrieve stock data and send back to client
                        stock_finder.getStocks(allStocks, function (data) {
                            res.writeHead(200, {'Content-type': 'application/json'});
                            res.end(JSON.stringify(data));
                        }, console.log);
                    }
                }
            });
        } else {
            // not logged in
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end();
        }
    });
}

function deleteStock(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsed = JSON.parse(body);
        let stockID = parsed["stockID"];
        console.log(stockID);
        Stock.findOneAndRemove({_id: stockID}, (err) => {
            if(err) {
                // Error removing stock from database
                res.writeHead(404);
                res.end();
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    });
}

