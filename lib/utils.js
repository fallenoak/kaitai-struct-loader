var path = require('path');

function strToPascal (str) {
	return str.replace(
		/(\w)(\w*)/g,
		function (a, b, c) { return b.toUpperCase() + c.toLowerCase(); }
	);
}

function idToFilename (id) {
	return strToPascal(id) + '.js';
}

function escapeRegExp (str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeRelPath (str) {
	if (str.charAt(0) === '.' || str.charAt(0) === '/') {
		return str;
	} else {
		return './' + str;
	}
}

function rewritePaths (reqPath, code, map) {
	var codeRw = code;
	var ksyIds = Object.keys(map);

	for (var i = 0; i < ksyIds.length; i++) {
		var ksyId = ksyIds[i];
		var importPath = map[ksyId];

		var curPath = './' + strToPascal(ksyId);
		var curRegExp = new RegExp('(\'|")' + escapeRegExp(curPath) + '(\'|")', 'g');
		var relPath = normalizeRelPath(path.relative(path.dirname(reqPath), importPath));

		codeRw = codeRw.replace(curRegExp, '$1' + relPath + '$2');
	}

	return codeRw;
}

module.exports = {
	idToFilename: idToFilename,
	strToPascal: strToPascal,
	escapeRegExp: escapeRegExp,
	normalizeRelPath: normalizeRelPath,
	rewritePaths: rewritePaths
};
