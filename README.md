# MCMS

MCMS is a fast Minimal CMS written in server side JavaScript. It uses only the 
file system and as such runs without a database. [Mustache](http://mustache.github.com/) is used for defining the templates and [GitHub flavored Markdown](https://github.com/isaacs/github-flavored-markdown) for the pages. It also includes basic support for creating a list of links to all pages, making it possible to use it as a simple blog.

By being built on top of the [CommonJS](http://commonjs.org) [Filesystem/A](http://wiki.commonjs.org/wiki/Filesystem/A) and [JSGI 0.3](http://wiki.commonjs.org/wiki/JSGI/Level0/A/Draft2) specs, it runs on any server side JavaScript platform, such as Node.js (via [Common Node](http://olegp.github.com/common-node/)) and [RingoJS](http://ringojs.org).

### Usage

If you're on Node, install MCMS with `npm install mcms` (TODO: publish to npm). Also make sure that you have [Common Node](https://github.com/olegp/common-node/#readme) installed as a global package (via `npm install -g common-node`). To test that it's working, run `common-node node_modules/mcms`. Then open [http://localhost:8080](http://localhost:8080) with your browsers - you should see the contents of this README.

The easiest way to get started with a new site is to clone an already existing one and modify it to get the site you want (TODO: add link to repo). Alternatively, if you're starting from scratch you can also create a directory for your site. Inside it, add a single file named `index.js` with the following line:

  exports.app = require('mcms').app;

In the same directory, create the following sub-directories:

  * `static` - Contains our static resources such as JavaScript served to the browser and CSS
  * `templates` - For the page templates - usually just one called `index.html`. Templates are defined using HTML and Mustache.
  * `pages` - For the actual pages in Markdown format, e.g. `index.md`.

To serve the site, run `common-node .` inside the site directory. For an example, take a look at the source for this package - the MCMS project itself includes the same directories that make up a site that serves this README file.

### Features

* over-riding the default (index) template on a per page basis
* including partial HTML files in one or more templates
* including partial Markdown (md) files in one or more templates 
* including a list of all the pages for a blog

### License 

(The MIT License)

Copyright (c) 2011+ Oleg Podsechin

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
