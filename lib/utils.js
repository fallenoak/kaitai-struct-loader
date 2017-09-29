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

function rewritePaths (code, map) {
	var codeRw = code;
	var ksyIds = Object.keys(map);

	for (var i = 0; i < ksyIds.length; i++) {
		var ksyId = ksyIds[i];
		var resolvedPath = map[ksyId];

		var modulePath = './' + strToPascal(ksyId);
		var moduleRegExp = new RegExp('(\'|")' + escapeRegExp(modulePath) + '(\'|")', 'g');

		codeRw = codeRw.replace(moduleRegExp, '$1' + resolvedPath + '$2');
	}

	return codeRw;
}

module.exports = {
	idToFilename: idToFilename,
	strToPascal: strToPascal,
	escapeRegExp: escapeRegExp,
	rewritePaths: rewritePaths
};
