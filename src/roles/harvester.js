// harvesters are basic multi purpose miners that take on the responsibility of energy delivery
// in addition to mining.

const creepNavigator = require("../nav/pathfinder");
const mineRefueler = require("../action/refuel-from-energy-source");
const buildActions = require("../action/find-nearest-construction");

const findEnergyStorageLocations = creep => {
  const storageLocations = creep.room
    .find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_CONTAINER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    })
    .sort((a, b) => {
      if (a.structureType === STRUCTURE_CONTAINER && b.structureType !== STRUCTURE_CONTAINER) {
        return 1;
      }

      if (b.structureType === STRUCTURE_CONTAINER && a.structureType !== STRUCTURE_CONTAINER) {
        return -1;
      }

      return 0;
    });

  return storageLocations;
};

const deliverEnergyToTarget = (creep, target) => {
  creep.say("🔄 delivering energy");

  const name = target.name || target.id;
  console.log("Transferring energy to " + target.structureType + ":" + name);

  const transferResult = creep.transfer(target, RESOURCE_ENERGY);

  if (transferResult == ERR_NOT_IN_RANGE) {
    creepNavigator.moveCreepTo(creep, target);
  } else if (transferResult !== OK) {
    console.log("Unable to transfer because error " + transferResult);
  }
};

const dumpExcessEnergy = creep => {
  if (creep.room.name === creep.memory.spawn) {
    creep.say("excess");
    console.log(creep.name + " has excess energy");
    // build things first
    const site = buildActions.findNearestConstructionSite(creep);
    if (site) {
      // creep.say("build");
      buildActions.constructTarget(creep, site);
    }
    // repair things second
    else {
      // const thingToRepair = buildActions.findNearestThingToRepair(creep);
      // if (thingToRepair) {
      //   // creep.say("repair");
      //   buildActions.repairThing(creep, thingToRepair);
      // }
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
    creep.moveTo(Game.spawns[creep.memory.spawn]);
  }
};

const roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (!creep.memory.delivering && creep.store.getFreeCapacity() > 0) {
      mineRefueler.run(creep);
    } else {
      creep.memory.delivering = true;

      const dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
      if (dropped && creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
        creepNavigator.moveCreepTo(creep, dropped);
      }

      const targets = findEnergyStorageLocations(creep);
      if (targets.length > 0) {
        deliverEnergyToTarget(creep, targets[0]);

        // // if empty
        if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
          creep.memory.delivering = false;
        }
      } else {
        // const site = buildActions.findNearestConstructionSite(creep);
        // if (site) {
        //     creep.say('build')
        //     buildActions.constructTarget(creep, site);
        // } else {
        //     const thingToRepair = buildActions.findNearestThingToRepair(creep);
        //     creep.say('repair')
        //     buildActions.repairThing(creep, thingToRepair);
        // }
        // // // if empty
        // if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
        //     creep.memory.delivering = false;
        // }
        dumpExcessEnergy(creep);
      }
    }
  }
};

module.exports = roleHarvester;

/**
 * harvester ai
 *
 * Gather energy resources
 * 1. Gather from source in memory
 *
 * Spend energy in the following order:
 * 1. Fill extensions
 * 2. Fill spawner
 * 3. Fill containers
 * 4. Construct stuff
 * 5. Fix Stuff
 * 6. Upgrade Room Controller
 */
