var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html', 'text/html')
      break;
    case '/index.html':
      sendFile(res, 'index.html', 'text/html')
      break;
    case '/styles.css':
      res.writeHead(200, {'Content-type' : 'text/css'});
      var fileContents = fs.readFileSync('./styles.css', {encoding: 'utf8'});
      res.write(fileContents);
      res.end();
      break;
    case '/scripts.js':
      sendFile(res, 'scripts.js', 'text/javascript');
      break;
    default:
      res.end('404 not found')
  }




})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename, type) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': type});
    res.end(content, 'utf-8')
  })

}
