var path = require('path');
var yaml = require('js-yaml');

function Importer(reqPath, fs, addDependency) {
	this.reqDir = path.dirname(reqPath);
	this.fs = fs;
	this.addDependency = addDependency;
	this.map = {};
}

Importer.prototype.importYaml = function(rawPath) {
	var importPath = rawPath;

	if (!importPath.match(/\.ksy$/)) {
		importPath = importPath + '.ksy';
	}

	var resolvedPath = path.resolve(this.reqDir, importPath);

	// Mark import as dependency
	this.addDependency(resolvedPath);

	var importContent = this.fs.readFileSync(resolvedPath);

	var importKsy = yaml.safeLoad(importContent);

	// Preserve paths for path rewriting
	this.map[importKsy.meta.id] = resolvedPath;

	return Promise.resolve(importKsy);
}

module.exports = Importer;
