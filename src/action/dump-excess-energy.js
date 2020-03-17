const buildActions = require("./find-nearest-construction");
const deliverEnergyToTarget = require("./deliver-energy-to-target");
const locateNearestTowerNeedingFuel = require("./locate-nearest-tower-needing-fuel");
const creepNavigator = require("../nav/pathfinder");

const dumpExcessEnergy = creep => {
  if (creep.room.name === Game.spawns[creep.memory.spawn].room.name) {
    creep.say("excess");
    console.log(creep.name + " has excess energy");
    // build things first
    const site = buildActions.findNearestConstructionSite(creep);
    if (site) {
      creep.say("build");
      buildActions.constructTarget(creep, site);
    } else {
      const towerNeedingFuel = locateNearestTowerNeedingFuel(creep);
      if (towerNeedingFuel) {
        deliverEnergyToTarget(creep, towerNeedingFuel);
      } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creepNavigator.moveCreepTo(creep, creep.room.controller.pos);
      }
    }
    // // if empty
    if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
      creep.memory.delivering = false;
    }
  } else {
    const spawnName =
      creep.memory.spawn ||
      creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_SPAWN
      })[0].name;
    creep.moveTo(Game.spawns[spawnName]);
  }
};

module.exports = dumpExcessEnergy;
