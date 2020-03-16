const { expect } = require("chai");
const sinon = require("sinon");
const { Memory } = require("../mock");
const _ = require("lodash");
require("../../src/prototype/creep");

describe("creep", () => {
  let creep;
  let run;

  beforeEach(() => {
    global.Memory = _.clone(Memory);
    creep = new Creep();
    creep.name = "bob";
    run = sinon.stub();
    global.Memory.creeps[creep.name] = {};
  });

  afterEach(() => {
    expect(run.calledOnce).is.true;
  });

  it("should invoke the harvester logic", () => {
    global.Memory.creeps[creep.name].role = "harvester";
    creep.logic = { harvester: run };
    creep.execute();
  });

  it("should invoke the builder logic", () => {
    global.Memory.creeps[creep.name].role = "builder";
    creep.logic = { builder: run };
    creep.execute();
  });

  it("should invoke the upgrader logic", () => {
    global.Memory.creeps[creep.name].role = "upgrader";
    creep.logic = { upgrader: run };
    creep.execute();
  });
});
