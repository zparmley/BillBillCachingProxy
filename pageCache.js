var PageCache = function(options) {
	this.PageCache = {}
}
PageCache.prototype.setData = function(key, value) {
	this.PageCache[key] = value
	return true
}
PageCache.prototype.getData = function(key) {
	return this.PageCache[key]
}
PageCache.prototype.deleteData = function(key) {
	this.PageCache[key] = null
	return true
}
PageCache.prototype.flushData = function() {
	this.PageCache = {}
}
PageCache.prototype.updateData = function(key, field, value) {
	this.PageCache[key][field] = value
}


exports.PageCache = PageCache