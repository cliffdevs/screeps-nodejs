const creepNavigator = require("../nav/pathfinder");

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

module.exports = deliverEnergyToTarget;
