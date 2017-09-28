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
	var ids = Object.keys(map);

	for (var i = 0; i < ids.length; i++) {
		var id = ids[i];
		var path = map[id];

		var modulePath = './' + strToPascal(id);
		var moduleRx = new RegExp('(\'|")' + escapeRegExp(modulePath) + '(\'|")', 'g');

		codeRw = codeRw.replace(moduleRx, '$1' + path + '$2');
	}

	return codeRw;
}

module.exports = {
	idToFilename: idToFilename,
	strToPascal: strToPascal,
	escapeRegExp: escapeRegExp,
	rewritePaths: rewritePaths
};
