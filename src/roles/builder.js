/**
 * Builder is a role that will work on construction sites or repair damaged structures.
 */

const creepMover = require("../nav/pathfinder");
const containerRefueler = require("../action/refuel-from-container");
const mineRefueler = require("../action/refuel-from-energy-source");

const MIN_WALL_HEALTH = 5000;

const constructTarget = (creep, target) => {
  if (creep.build(target) == ERR_NOT_IN_RANGE) {
    console.log("Creep " + creep.name + " moving to " + target.structureType + ":" + target.id);
    creepMover.moveCreepTo(creep, target);
  }
};

const findNearestThingToRepair = creep => {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: object => {
      return (
        (object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax / 3) ||
        (object.structureType == STRUCTURE_CONTAINER && object.hits < object.hitsMax / 3) ||
        (object.structureType == STRUCTURE_WALL && object.hits < MIN_WALL_HEALTH) ||
        (object.structureType == STRUCTURE_RAMPART && object.hits < MIN_WALL_HEALTH)
      );
    }
  });
};

const repairThing = (creep, toRepair) => {
  if (toRepair) {
    creep.say("fixing");
    creepMover.moveCreepTo(creep, toRepair);
    creep.repair(toRepair);
  }
};

const findNearestConstructionSite = creep => {
  return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
};

const roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (!creep.memory.building) {
      if (!containerRefueler.run(creep)) {
        mineRefueler.run(creep);
      }
    }
    if (creep.memory.building) {
      const target = findNearestConstructionSite(creep);

      if (target) {
        constructTarget(creep, target);
      } else {
        const toRepair = findNearestThingToRepair(creep);
        if (toRepair) {
          creep.say("repair");
          repairThing(creep, toRepair);
        } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.say("upgrade");
          creepMover.moveCreepTo(creep, creep.room.controller.pos);
        }
      }
    }
  }
};

module.exports = roleBuilder;
