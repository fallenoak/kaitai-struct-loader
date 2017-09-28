var path = require('path');
var yaml = require('js-yaml');

function Importer(rootPath, fs) {
	this.rootDir = path.dirname(rootPath);
	this.fs = fs;
	this.map = {};
}

Importer.prototype.importYaml = function(ksyPath) {
	var importPath = ksyPath;

	if (!importPath.match(/\.ksy$/)) {
		importPath = importPath + '.ksy';
	}

	var resolvedPath = path.resolve(this.rootDir, importPath);

	var importContent = this.fs.readFileSync(resolvedPath);

	var importKsy = yaml.safeLoad(importContent);

	// Preserve paths for path rewriting
	this.map[importKsy.meta.id] = resolvedPath;

	return Promise.resolve(importKsy);
}

module.exports = Importer;
