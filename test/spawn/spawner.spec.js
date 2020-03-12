const spawner = require("../../src/spawn/spawner");
const { expect } = require("chai");
const sinon = require("sinon");
const { Game, Memory } = require("../mock");
const _ = require("lodash");

describe("spawner", () => {
  const roomName = "E11N22";
  const room = {
    name: roomName,
    controller: {
      level: 1
    },
    memory: (Memory.rooms[roomName] = Memory.rooms[roomName] || {}),
    visual: {
      text: sinon.stub()
    },
    find: sinon.stub()
  };

  let spawn1;
  let spawn2;

  beforeEach(() => {
    global.Memory = _.clone(Memory);
    global.Game = _.clone(Game);

    spawnName1 = "spawn1";
    spawn1 = {
      name: spawnName1,
      memory: global.Memory.spawns[spawnName1],
      spawning: true,
      spawnCreep: sinon.spy(),
      room,
      pos: {
        x: 0,
        y: 0
      }
    };

    spawnName2 = "spawn2";
    spawn2 = {
      name: spawnName2,
      memory: global.Memory.spawns[spawnName2],
      spawning: true,
      spawnCreep: sinon.stub(),
      room,
      pos: {
        x: 0,
        y: 0
      }
    };

    global.Game.spawns[spawn1.name] = spawn1;
    global.Game.spawns[spawn2.name] = spawn2;
    global.Game.rooms[roomName] = room;
    global.Memory.rooms[roomName].spawners = [spawn1.name, spawn2.name];
    room.find.returns([spawn1, spawn2]);
  });

  it("should populate a spawn queue with new creep configs when they are below the minimum thresholds", () => {
    spawner.run(roomName);
    expect(global.Memory.rooms[roomName].spawnQueue.length).to.be.greaterThan(0);
  });

  it("should set pending roles for a room when their spawn is queued so that spawns don't infinitely queue", () => {
    spawner.run(roomName);
    const pendingSpawnCounters = global.Memory.rooms[roomName].pendingSpawnCounters;
    expect(pendingSpawnCounters).not.to.be.undefined;
    expect(pendingSpawnCounters.harvester).to.be.greaterThan(0);
    expect(pendingSpawnCounters.upgrader).to.be.greaterThan(0);
    expect(pendingSpawnCounters.carry).to.be.greaterThan(0);
  });

  it("should spawn the first creepConfig in the queue when a spawner is available", () => {
    spawn1.spawning = false;
    const fake = sinon.fake.returns(OK);
    sinon.replace(spawn1, 'spawnCreep', fake);
    spawner.run(roomName);
    expect(spawn1.spawnCreep.called).is.true;
    expect(spawn1.spawnCreep.getCall(0).args[0]).does.exist;
  });
});
