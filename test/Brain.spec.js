const { expect } = require("chai");
const sinon = require("sinon");
const Brain = require("../src/Brain");
const { Game, getFakeRoom, Memory } = require("./mock");
const _ = require("lodash");

describe("Brain", () => {
  let mockMemoryCleaner;
  let brain;

  beforeEach(() => {
    global.Game = _.clone(Game);
    global.Memory = _.clone(Memory);

    mockMemoryCleaner = {
      purge: sinon.spy()
    };

    brain = new Brain(mockMemoryCleaner);
  });

  it("should clean out the memory once every loop iteration", () => {
    brain.loop();
    expect(mockMemoryCleaner.purge.called, "why didnt brain.loop purge the memory?").to.be.true;
  });

  it("should skip execution when the CPU bucket is too low", () => {
    global.Game.time = 1001;
    global.Game.cpu = Object.assign(global.Game.cpu, {
      bucket: 1,
      limit: 20,
      tickLimit: 20
    });

    brain.loop();

    expect(mockMemoryCleaner.purge.called).to.be.false;
  });

  it("should not skip execution when the game time is too low", () => {
    global.Game.time = 999;
    global.Game.cpu = Object.assign(global.Game.cpu, {
      bucket: 20,
      limit: 20,
      tickLimit: 20
    });

    brain.loop();

    expect(mockMemoryCleaner.purge.called).to.be.true;
  });

  it("should not skip execution when the cpu bucket is greater than twice the cpu tick limit", () => {
    global.Game.time = 1001;
    global.Game.cpu = Object.assign(global.Game.cpu, {
      bucket: 41,
      limit: 20,
      tickLimit: 20
    });

    brain.loop();

    expect(mockMemoryCleaner.purge.called).to.be.true;
  });

  it("should not skip execution when the the cpu bucket is greater than ten times the cpu limit", () => {
    global.Game.time = 1001;
    global.Game.cpu = Object.assign(global.Game.cpu, {
      bucket: 101,
      limit: 10,
      tickLimit: 200
    });

    brain.loop();

    expect(mockMemoryCleaner.purge.called).to.be.true;
  });

  it("should push the last tick timestamp to memory every time the loop is run", () => {
    global.Game.time = 1234;
    brain.loop();
    expect(global.Memory.time).to.equal(global.Game.time);
  });

  //  note that if a creep or observer is not present in a room, then the room is not present in Game.rooms
  it("should execute each room's execute method in which there are currently creeps", () => {
    const E01S01 = getFakeRoom("E01S01", { execute: sinon.stub() });
    const E02S01 = getFakeRoom("E02S01", { execute: sinon.stub() });

    global.Game.rooms = {
      E01S01,
      E02S01
    };

    brain.loop();

    expect(E01S01.execute.calledOnce).to.be.true;
    expect(E02S01.execute.calledOnce).to.be.true;
  });
});
