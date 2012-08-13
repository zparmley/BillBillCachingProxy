var fs      = require('fs')
var filed   = require('filed')
var http    = require('http')
var request = require('request')

// This needs to be config'd
var cacheDir = 'pagecache'


// Set up the server
http.createServer(function(req, resp) {
    var host = req.headers['host']
    var url  = req.url
    var cacheFile = cacheDir + '/' + new Buffer(host + url).toString('base64')
    
    console.log(cacheFile)

    fs.lstat(cacheFile, function(err, stats) {
        if (!err && stats.isFile()) {
            // Cache hit
            filed(cacheFile).pipe(resp)
        } else {
            // Cache miss

            // Currently a server on 2020 is waitig 3 seconds and sending a simple response, for dev
            var originReq = request('http://localhost:2020')
            var filedFile = filed(cacheFile)

            console.log(originReq)

            originReq.on('close', function() {
                filedFile.pipe(resp)
            })

            originReq.pipe(filedFile)
            // filed(cacheFile).pipe(resp)
            // .pipe(resp)
        }
    })

}).listen(10001)