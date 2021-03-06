var KaitaiStructCompiler = require("kaitai-struct-compiler");
var loaderUtils = require("loader-utils");
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
	var kaitaiImport = 'var KaitaiStream = require("kaitai-struct/KaitaiStream")\n';

	compiler.compile("javascript", structure, null, this.debug).then(function (code) {
		callback(null, kaitaiImport + Object.values(code).join('\n'), null);
	}).catch(function (error) {
		callback(new Error(error), null);
	});
};
