var KaitaiStructCompiler = require('kaitai-struct-compiler');
var Importer = require('./importer');
var loaderUtils = require('loader-utils');
var yaml = require('js-yaml');
var idToFilename = require('./utils').idToFilename;

module.exports = function (source) {
	if (this.cacheable) this.cacheable();
	var callback = this.async();

	var rootKsy;
	try {
		rootKsy = yaml.safeLoad(source);
	} catch (error) {
		callback(new Error(error));
		return;
	}

	var compiler = new KaitaiStructCompiler();
	var importer = new Importer(this.resourcePath, this.fs);

	compiler.compile('javascript', rootKsy, importer, this.debug).then(function (code) {
		callback(null, code[idToFilename(rootKsy.meta.id)], null);
	}).catch(function (error) {
		callback(new Error(error), null);
	});
};
