var COMMON_NODE = global.process;
var fs = require(COMMON_NODE ? 'fs-base' : 'fs');
var mustache = require(COMMON_NODE ? 'mustache' : 'ringo/mustache').to_html;
var markdown = require('github-flavored-markdown').parse;

var PAGES = './pages', TEMPLATES = './templates', INCLUDES = './includes', STATIC = './static', SEPARATOR = '|';
var ABSOLUTE_STATIC = fs.absolute(STATIC);

var MIME_TYPES = {
	".css": "text/css",
	".gif": "image/gif",
	".ico": "image/vnd.microsoft.icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".js": "application/javascript",
	".json": "application/json",
	".png": "image/png",
	".txt": "text/plain",
	".zip": "application/zip"
};

var pages = {}, templates = {}, includes = {}, ascending = [], descending;

function friendly(url) {
	return url.toLowerCase() // 
	.replace(/^\s+|\s+$/g, "") // trim leading and trailing spaces
	.replace(/[_|\s]+/g, "-") // change all spaces and underscores to a hyphen
	.replace(/[^a-zF0-9-\/]+/g, "") // remove non alpha, digit, '-', '/' chars
	.replace(/[-]+/g, "-") // replace multiple hyphens with one
	.replace(/^-+|-+$/g, ""); // trim leading and trailing hyphens
}

function read(file) {
	return fs.openRaw(file).read().decodeToString();
}

function merge() {
	var result = {};
	for( var i = arguments.length; i > 0; --i) {
		var obj = arguments[i - 1];
		for( var property in obj) {
			result[property] = obj[property];
		}
	}
	return result;
}

fs.listTree(PAGES).splice(1).forEach(function(file) {
	if(!fs.isDirectory(fs.join(PAGES, file))) {
		var ext = fs.extension(file);
		var title = fs.base(file, ext), i = title.indexOf(SEPARATOR);
		// trim leading prefix (which is used for lexicographic sorting)
		if(i != -1) {
			title = title.substring(i + 1);
		}
		var link = friendly(file.substr(0, file.lastIndexOf(ext)));
		file = fs.join(PAGES, file);
		var page = {
			file: file,
			title: title,
			link: link,
			modified: fs.lastModified(file)
		};
		ascending.push(pages[link] = page);
	}
});

descending = ascending.slice().reverse();

fs.listTree(TEMPLATES).splice(1).forEach(function(file) {
	var path = fs.join(TEMPLATES, file);
	if(!fs.isDirectory(path)) {
		var ext = fs.extension(file);
		templates[friendly(file.substr(0, file.lastIndexOf(ext)))] = read(path);
	}
});

fs.exists(INCLUDES) && fs.list(INCLUDES).forEach(function(file) {
	var ext = fs.extension(file);
	var contents = read(fs.join(INCLUDES, file));
	if(ext == '.md') {
		contents = markdown(contents);
	}
	includes[file.substr(0, file.lastIndexOf(ext))] = contents;
});

// serve a static file
function serve(uri) {
	var file = fs.absolute(fs.join(ABSOLUTE_STATIC, uri
			.substr('static'.length + 1)));
	if(!file.indexOf(ABSOLUTE_STATIC) && fs.exists(file)) {
		return {
			status: 200,
			'Content-Type': MIME_TYPES[fs.extension(file)],
			// TODO add etag or last-modified header
			// TODO add support for caching
			body: fs.openRaw(file)
		};
	} else {
		return {
			status: 404,
			headers: {},
			body: []
		};
	}
}

// load a dynamically generated page
function load(name) {
	var page = pages[name];
	if(page) {
		if(!page.body) {
			var content = read(page.file);
			if(fs.extension(page.file) == '.md') {
				content = markdown(content);
			}
			var template = templates[page.link]
					|| templates[fs.join(fs.directory(page.link), 'index')]
					|| templates['index'];
			page.body = mustache(template, merge({
				title: page.title == 'index' ? '' : page.title,
				body: content,
				ascending: ascending,
				descending: descending
			}, includes));
		}
		return page.body;
	}
	return '';
}

exports.app = function(request) {
	var uri = request.pathInfo.substr(1);
	if(!uri.indexOf('static')) {
		return serve(uri);
	}
	var name = friendly(uri) || 'index';
	var page = load(name);
	return {
		status: page ? 200 : 404,
		headers: {
			'Content-Type': 'text/html'
		},
		body: [page || load('404')]
	};
};

if(require.main === module && !COMMON_NODE) {
	require("ringo/httpserver").main(module.id);
}