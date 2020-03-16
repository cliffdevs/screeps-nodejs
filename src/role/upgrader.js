const creepMover = require("../nav/pathfinder");
const containerRefueler = require("../action/refuel-from-container");
const sourceRefueler = require("../action/refuel-from-energy-source");
const { deliverEnergyToTarget } = require("../action/transfer-energy");

/**
 * Return a single tower object if one exists needing energy
 * @param {Creep} creep
 */
const locateNearestTowerNeedingFuel = creep => {
  return creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  });
};

const roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 refuel");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say("⚡ upgrade");
    }

    if (creep.memory.upgrading) {
      const towerNeedingFuel = locateNearestTowerNeedingFuel(creep);
      if (towerNeedingFuel) {
        deliverEnergyToTarget(creep, towerNeedingFuel);
      } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creepMover.moveCreepTo(creep, creep.room.controller.pos);
      }
    } else {
      if (!containerRefueler.run(creep)) {
        sourceRefueler.run(creep);
      }
    }
  }
};

module.exports = roleUpgrader;
