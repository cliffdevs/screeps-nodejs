const expect = require("chai").expect;
const sinon = require("sinon");
const { build } = require("../src/main");
const { Game, Memory } = require("./mock");
const _ = require("lodash");

describe("main", () => {
  let main;
  let mockBrain;
  let legacyLogic;

  beforeEach(() => {
    global.Game = _.clone(Game);
    global.Memory = _.clone(Memory);

    mockBrain = {
      loop: sinon.spy()
    };

    mockLegacyLogic = () => { };

    main = build(mockBrain, mockLegacyLogic);
  });

  it("should export a loop function", () => {
    expect(main.loop).to.be.a("function");
  });

  it("should return void when called with no context", () => {
    expect(main.loop()).is.undefined;
  });

  it("should execute the brain loop", () => {
    main.loop();
    expect(mockBrain.loop.called).to.be.true;
  });
});
