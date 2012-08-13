var async   = require('async')
var fs      = require('fs')
var filed   = require('filed')
var http    = require('http')
var request = require('request')

// This needs to be config'd
var cacheDir = 'pagecache'



// TODO: Basic congig - this will be defined externally - routes are mapleTree matchable against 'url'
var config = [
    {
        host       : 'localhost:10001',
        origin     : 'localhost:2020',
        defaultTtl : 7200,
        rules :      [
            {
                route : '/nocache*',
                ttl :   0
            },
            {
                route : '/cache5seconds*',
                ttl :   5
            },
            {
                route : '/cache100seconds*',
                ttl :   20
            }
        ]
    }
]


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

            // TODO: I'd hoped to do something a little different, namely pipe the request to multiple destinations (file and response) but alas, it is beyond me at the moment
            // TODO: This lacks efficiency in that it reads data it technically already has out of a file
            // TODO: I'm a little worried about a race condition with this setup, where the request is complete but the file write is not, so an incomplete file is read and set back - not sure yet if this is a problem or best sollution

            // DEV Currently a server on 2020 is waitig 3 seconds and sending a simple response, for dev
            // Request from the origin and pipe it to the cache file
            request('http://localhost:2020', function(e, r, b) {
                if (!e) {
                    // If no error, pipe the cached file back to the response object when complete
                    filed(cacheFile).pipe(resp)
                }
            }).pipe(filed(cacheFile))
        }
    })

}).listen(10001)