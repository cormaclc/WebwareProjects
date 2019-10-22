var http = require('http')
    , fs   = require('fs')
    , url  = require('url')
    , mongoose = require('mongoose')
    , {parse} = require('querystring')
    , advert = require("./public/models/advert")
    , port = 8080;

mongoose.connect("mongodb://Admin:adminpassword1@ds259732.mlab.com:59732/a3", { useNewUrlParser: true});

var server = http.createServer (function (req, res) {
    var uri = url.parse(req.url)

    if(req.method === 'PUT') {
        switch(uri.pathname) {
            case '/addAdvert':
                addAdvert(res, req);
                break;
            case '/updateAdvert':
                updateAdvert(res, req);
                break;
            default:
                break;
        }
    } else {
        switch (uri.pathname) {
            case '/':
                sendFile(res, 'public/index.html', 'text/html')
                break;
            case '/index.html':
                sendFile(res, 'public/index.html', 'text/html')
                break;
            case '/css/styles.css':
                sendFile(res, 'public/css/styles.css', 'text/css');
                break;
            case '/js/scripts.js':
                sendFile(res, 'public/js/scripts.js', 'text/javascript');
                break;
            case '/displayAdverts':
                getAdverts(res);
                break;
            case '/deleteAdvert':
                deleteAdvert(res, req);
                break;
            default:
                res.end('404 not found')
        }
    }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function addAdvert(res, req) {
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        process( JSON.parse(body));
    });

    function process(row) {
        advert.create({id: row.id, department: row.department, course: row.course, details: row.details, email: row.email}, (err, newlyCreated) => {
            if(err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-type': 'application/json'});
                res.end();
            }
        });
    }
}

function updateAdvert(res, req) {
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        process( JSON.parse(body));
    });

    function process(row) {
        advert.findOneAndUpdate({id: row.id}, {id: row.id, department: row.department, course: row.course, details: row.details, email: row.email}, (err, newlyCreated) => {
            if(err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-type': 'application/json'});
                res.end();
            }
        });
    }
}

function getAdverts(res) {
    let adverts_list = [];
    advert.find(function (err, adverts) {
        if (err) return console.error(err);
        adverts_list = adverts;
        res.end(JSON.stringify(adverts_list));
    });
}

function deleteAdvert(res, req) {
    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        process( JSON.parse(body));
    });

    function process(id) {
        advert.findOneAndDelete({"id" : id}, (err, doc) => {
            if(err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-type': 'application/json'});
                res.end();
            }
        })
    }
}

// subroutines
function sendFile(res, filename, type) {
    fs.readFile(filename, function(error, content) {
        res.writeHead(200, {'Content-type': type});
        res.end(content, 'utf-8')
    })
}