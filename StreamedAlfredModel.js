var StreamedAlfredModel = function(model, data, streamField) {
	this.model = model
	this.data = data
	this.streamField = streamField
	this.streamData = ''
	this.writeable = true
	this.readable = true
}

StreamedAlfredModel.prototype.write = function(data) {
	this.streamData = this.streamData + data
	return true
}

StreamedAlfredModel.prototype.end = function(data) {
	if (data) { this.write(data) }
	this.data[this.streamField] = this.streamData
	this.model.new(this.data).save(function(er) { console.log(er) })
	emit 'close'
}