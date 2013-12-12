var COMMON_NODE = global.process;
var mcms = require('./lib/mcms.js').mcms;

exports.app = mcms();

if (!COMMON_NODE && require.main == module) {
  require("ringo/httpserver").main(module.id);
}