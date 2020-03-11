"use strict";

const roleHarvester = require("./role.harvester");
const roleBuilder = require("./role.builder");
const roleUpgrader = require("./role.upgrader");
const spawner = require("../spawn/spawner");

const oldLoop = () => {
  console.log(`Current game tick is ${Game.time}`);
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
  spawner.run();
};

module.exports = oldLoop;
