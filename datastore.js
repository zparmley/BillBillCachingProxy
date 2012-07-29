var alfred = require('Alfred')

var getCachedPageModel = function(cb) {
		alfred.open('./alfreddata/', function(er, db) {
		if (er) { throw er }
		var CachedPage = db.define('CachedPage', {
			indexes: [
				{	name: 'expires',
					fn:   function(CachedPage) { return CachedPage.expires }},
				{ 	name: 'key',
					fn:   function(CachedPage) { return CachedPage.cacheKey }}]
		})
		
		CachedPage.property('expires', Number)
		CachedPage.property('content', 'string')
		CachedPage.property('cacheKey', 'string')
		cb(CachedPage)
	})
}