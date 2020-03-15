// refuelers are tower specific couriers
const { deliverEnergyToTarget } = require("../action/transfer-energy");

/**
 * Return a single tower object if one exists needing energy
 * @param {Creep} creep
 */
const locateNearestTowerNeedingFuel = creep => {
  return creep.pos.findClosestByPath(STRUCTURE_TOWER, {
    filter: tower => tower.energy < tower.energyCapacity
  });
};

const run = creep => {
  const towerNeedingFuel = locateNearestTowerNeedingFuel(creep);
  if (towerNeedingFuel) {
    deliverEnergyToTarget(creep, target);
  }
};

module.exports = {
  run
};
