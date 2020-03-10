require("./globals");
require("../src/prototype");
global._ = require("lodash");
global.chai = require("chai");
global.sinon = require("sinon");
global.chai.use(require("sinon-chai"));
