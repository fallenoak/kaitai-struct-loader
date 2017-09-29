var KaitaiStructCompiler = require('kaitai-struct-compiler');
var Importer = require('./importer');
var loaderUtils = require('loader-utils');
var yaml = require('js-yaml');
var utils = require('./utils');

module.exports = function (source) {
	if (this.cacheable) this.cacheable();
	var callback = this.async();

	var requestKsy;
	try {
		requestKsy = yaml.safeLoad(source);
	} catch (error) {
		callback(new Error(error));
		return;
	}

	var requestPath = this.resourcePath;

	var compiler = new KaitaiStructCompiler();
	var importer = new Importer(this.resourcePath, this.fs, this.addDependency);

	compiler.compile('javascript', requestKsy, importer, this.debug).then(function (code) {
		requestCode = code[utils.idToFilename(requestKsy.meta.id)];
		callback(null, utils.rewritePaths(requestPath, requestCode, importer.map), null);
	}).catch(function (error) {
		callback(new Error(error), null);
	});
};
