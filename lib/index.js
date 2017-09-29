var KaitaiStructCompiler = require('kaitai-struct-compiler');
var Importer = require('./importer');
var loaderUtils = require('loader-utils');
var yaml = require('js-yaml');
var utils = require('./utils');

module.exports = function (source) {
	if (this.cacheable) this.cacheable();
	var callback = this.async();

	var reqKsy;
	try {
		reqKsy = yaml.safeLoad(source);
	} catch (error) {
		callback(new Error(error));
		return;
	}

	var reqPath = this.resourcePath;
	var reqId = reqKsy.meta.id;

	var compiler = new KaitaiStructCompiler();
	var importer = new Importer(reqPath, this.fs, this.addDependency);

	compiler.compile('javascript', reqKsy, importer, this.debug).then(function (code) {
		reqCode = code[utils.idToFilename(reqId)];
		callback(null, utils.rewritePaths(reqPath, reqCode, importer.map), null);
	}).catch(function (error) {
		callback(new Error(error), null);
	});
};
