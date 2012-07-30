var http      = require('http')
  , url       = require('url')
  , mapleTree = require('mapleTree')
  , request   = require('request')
  , pageCache = require('./pageCache.js')
  ;






var configs   = [
	{
		'host'    : 'www.dreamrescue.org',
		'origin'  : '127.0.0.1:2019',
		'ttl'     : 7200,
		'excludes' : [
			'/wp-admin*',
			'/wp-login.php'
		]
	}
]

var servers = {}
var cache = new pageCache.PageCache()
configs.forEach(function(conf) {
	var host    = conf.host
	conf.router = new mapleTree.RouteTree()

	conf.excludes.forEach(function(exclude) {
		console.log('Excluding ' + exclude)
		conf.router.define(exclude, function() {
			return false
		})
	})

	conf.router.define('*', function() { return conf.ttl })
	conf.router.define('/', function() { return conf.ttl })


	servers[host] = conf
})



http.createServer(function(req, res) {
	console.log([req.headers.host, req.url])
	var host = req.headers.host
	var url = req.url
	if (servers[host] !== undefined) {
		match = servers[host].router.match(url)
		if (match !== undefined) {
			var ttl = match.fn()
			console.log(ttl)
			if (ttl !== false) {
				console.log('cacheable')
				request.get('http://www.example.org' + req.url).pipe(res)
			} else {
				console.log('skipping')
				request.get('http://www.example.org' + req.url).pipe(res)
			}
		}
	} else {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('nope dummy');
		res.end();
	}

}).listen(80)
