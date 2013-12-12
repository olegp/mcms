var COMMON_NODE = global.process;
var mcms = require('./lib/mcms.js').mcms;

if (require.main === module) {
  exports.app = mcms();
  if (!COMMON_NODE) {
    require("ringo/httpserver").main(module.id);
  }
}