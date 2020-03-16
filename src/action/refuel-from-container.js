const creepNavigator = require("../nav/pathfinder");

const run = creep => {
  const sources = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.structureType === STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 0
  });

  if (sources.length > 0) {
    if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creepNavigator.moveCreepTo(creep, sources[0]);
    }
    return true;
  } else {
    console.log("Cannot find refuel sources");
    creep.say("starving...");
    return false;
  }
};

module.exports = {
  run
};
