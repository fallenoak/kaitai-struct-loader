function strToPascal (str) {
	return str.replace(
		/(\w)(\w*)/g,
		function (a, b, c) { return b.toUpperCase() + c.toLowerCase(); }
	);
}

function idToFilename (id) {
	return strToPascal(id) + '.js';
}

module.exports = {
	idToFilename: idToFilename,
	strToPascal: strToPascal
};
