const spawner = require("../../src/spawn/spawner");
const { expect } = require("chai");
const { Memory } = require("../mock");
const _ = require("lodash");

describe("spawner", () => {
  const roomName = "E11N22";
  beforeEach(() => {
    global.Memory = _.clone(Memory);
  });

  it("should populate a spawn queue with new creep configs when they are below the minimum thresholds", () => {
    spawner.run(roomName);
    expect(global.Memory.rooms[roomName].spawnQueue.length).to.be.greaterThan(0);
  });

  it("should set pending roles for a room when their spawn is queued so that spawns don't infinitely queue", () => {
    spawner.run(roomName);
    const pendingRoles = global.Memory.rooms[roomName].pendingRoles;
    expect(pendingRoles).to.exist();
    expect(pendingRoles.harvester).to.be.greaterThan(0);
    expect(pendingRoles.upgrader).to.be.greaterThan(0);
    expect(pendingRoles.carrier).to.be.greaterThan(0);
  });

  it("should spawn the first creepConfig in the queue when a spawner is available", () => {});
});
