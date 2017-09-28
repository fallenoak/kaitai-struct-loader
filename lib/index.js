var KaitaiStructCompiler = require('kaitai-struct-compiler');
var Importer = require('./importer');
var loaderUtils = require('loader-utils');
var yaml = require('js-yaml');

module.exports = function (source) {
	if (this.cacheable) this.cacheable();
	var callback = this.async();

	var structure;
	try {
		structure = yaml.safeLoad(source);
	} catch (error) {
		callback(new Error(error));
		return;
	}

	var compiler = new KaitaiStructCompiler();
	var importer = new Importer(this.resourcePath, this.fs);

	compiler.compile('javascript', structure, importer, this.debug).then(function (code) {
		callback(null, Object.values(code).join('\n'), null);
	}).catch(function (error) {
		callback(new Error(error), null);
	});
};
