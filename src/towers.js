const enemyLocator = require("./action/locate-nearest-enemy");
const locationUtils = require("./util/locate");

/**
 * Attack the same target with all towers.
 * @param {Array<StructureTower>} towers
 * @param {Creep} thingToAttack
 */
const attackWithAllTowers = (towers, thingToAttack) => {
  towers.forEach(tower => attackWithTower(tower, thingToAttack));
};

/**
 * Attack a single target with a single tower.
 * @param {Array<StructureTower>} tower
 * @param {Creep} thingToAttack
 */
const attackWithTower = (tower, thingToAttack) => {
  tower.attack(thingToAttack);
};

/**
 * Have all towers heal the same target.
 * @param {Array<StructureTower} towers
 * @param {Structure} thingToRepair
 */
const repairWithAllTowers = (towers, thingToRepair) => {
  towers.forEach(tower => repairWithTower(tower, thingToRepair));
};

/**
 * Have a tower heal the target.
 * @param {StructureTower} tower
 * @param {Structure} thingToRepair
 */
const repairWithTower = (tower, thingToRepair) => {
  const result = tower.repair(thingToRepair);
  if (result !== OK) {
    let status = "bad";
    switch (status) {
      case -1:
        status = "ERR_NOT_OWNER";
        break;
      case -6:
        status = "ERR_NOT_ENOUGH_ENERGY";
        break;
      case -7:
        status = "ERR_INVALID_TARGET";
        break;
      case -14:
        status = "ERR_RCL_NOT_ENOUGH";
        break;
      default:
        status = "UNKNOWN";
    }
    console.log(
      `${tower.structureType}:${tower.id} unable to repair ${thingToRepair.structureType}:${thingToRepair.id}`
    );
  }
};

/**
 *
 * @param {Room} room
 */
const run = room => {
  const towers = room.find(FIND_MY_STRUCTURES, {
    filter: structure => structure.structureType === STRUCTURE_TOWER
  });
  const enemies = enemyLocator.findEnemies(room);
  if (enemies && enemies.length > 0) {
    attackWithAllTowers(towers, enemies[0]);
  } else {
    const thingsToRepair = locationUtils.findThingsToRepair(room);
    if (thingsToRepair && thingsToRepair.length > 0) {
      repairWithAllTowers(towers, thingsToRepair[0]);
    }
  }
};

module.exports = {
  run
};
