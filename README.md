# MCMS

MCMS is a fast Minimal CMS written in server side JavaScript. It uses only the file system and as such runs without a database. [Mustache](http://mustache.github.com/) is used for defining the templates and [GitHub flavored Markdown](https://github.com/isaacs/github-flavored-markdown) for the pages. It includes support for creating a list of links to all pages, making it possible to use it as a simple blog.

By being built on top of the [CommonJS](http://commonjs.org) [Filesystem/A](http://wiki.commonjs.org/wiki/Filesystem/A) and [JSGI 0.3](http://wiki.commonjs.org/wiki/JSGI/Level0/A/Draft2) specs, it runs on multiple server side JavaScript platforms, such as Node.js (via [Common Node](http://olegp.github.com/common-node/)) and [RingoJS](http://ringojs.org).

### Usage

#### Node

Install MCMS with `npm install mcms`. Also make sure that you have [Common Node](https://github.com/olegp/common-node/#readme) installed as a global package (via `npm install -g common-node`). Run `common-node node_modules/mcms` to start the server. 

#### RingoJS

Install the Markdown package with `ringo-admin install https://github.com/isaacs/giub-flavored-markdown/zipball/master`.

Install MCMS with `git clone git://github.com/olegp/mcms.git`, then `cd mcms` and start the server with `ringo ./lib/mcms.js`.

#### Viewing a Site

Once the server is running, open [http://localhost:8080](http://localhost:8080) with your browser - you should see the contents of this README.

#### Creating a Site

The easiest way to get started with a new site is to clone an already existing one and modify it to get the site you want (TODO: add link to repo). Alternatively, if you're starting from scratch you can also create a directory for your site. Inside it, add a single file named `index.js` with the following line:

    exports.app = require('mcms').app;

In the same directory, create the following sub-directories:

  * `static` - Contains our static resources such as JavaScript served to the browser and CSS
  * `templates` - For the page templates - usually just one called `index.html`. Templates are defined using HTML and Mustache.
  * `pages` - For the actual pages in Markdown format, e.g. `index.md`.

For an example, take a look at the source for this package - the MCMS project itself includes the same directories that make up a site that serves this README file.

### Features

### Custom Page Titles

The name of the file in the `./pages` directory becomes the page title, and is accessible via `{{title}}` inside templates.

### SEO friendly URLs

The name of the file is converted to an SEO friendly format which involves:

* converting all characters to lower case
* converting all spaces to hyphers (-)
* removing all non alpha, digit characters, hyphers or forward slashes
* removing all occurrences of more than one hyphen & leading/trailing hyphens

So, for example `Really Long & Weird Example!` becomes `really-long-weird-example`.

This SEO friendly URL is then used to access the given page. To get a list of all the page titles and URLs, see the "List of Pages" section below.

#### Page Sub-directories

It is possible to place pages in sub-directories. For example a page in the file `./pages/hello/world.md` is accessible at `/hello/world`.

#### Custom Templates

By default, every page uses the `templates/index.html` template. It is possible to override this template on a per page basis by creating a template with a name that matches that of the page, e.g. a page at `./pages/custom.md` can have a custom template provided via `./templates/custom.html`.  

#### Includes

It is possible to include reusable blocks of HTML across different templates by placing `.html` or `.md` files in the optional `./includes` directory. For example an include `./includes/footer.html` can be included via `{{{footer}}}` (triple mustaches are needed to ensure that the HTML is not escaped). Markdown (.md) files are automatically converted to HTML.

#### List of Pages

It is possible to get a list of all the pages on the site via the `{{ascending}}` array. For example, this renders a bunch of links to all the pages:

    {{ascending}} <a href="{{link}}">{{title}}</a> {{/ascending}}
    
The pages above are listed in an ascending lexicographic order. To get them in reverse use `{{descending}}`. If you have a list of blog posts which you would like to list in reverse chronological order, you can add an additional prefix used for sorting to the file name, e.g. `20101010|First post!.md` and use descending order to display a list of posts in reverse chronological order. Everything up to and including the `|` separator is used for sorting, but ignored when constructing page titles.
    
#### Custom Error Pages

It is possible to provide custom pages for HTTP file not found (404) errors. Simply create a file `./pages/404.md`.

### Acknowledgements

  * [Jan Lehnardt](http://github.com/janl/) for the CommonJS implementation of Mustache
  * [Isaac Schlueter](http://github.com/isaacs/) for the `github-flavored-markdown` package

### License 

(The MIT License)

Copyright (c) 2011+ Oleg Podsechin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.