/**
 * Return a single tower object if one exists needing energy
 * @param {Creep} creep
 */
const locateNearestTowerNeedingFuel = creep => {
  return creep.pos.findClosestByPath(STRUCTURE_TOWER, {
    filter: tower => tower.energy < tower.energyCapacity
  });
};

module.exports = locateNearestTowerNeedingFuel;
