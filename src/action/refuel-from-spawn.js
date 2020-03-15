const creepNavigator = require("../nav/pathfinder");

const run = creep => {
  // var sources = creep.room.find(FIND_SOURCES);
  const sources = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.structureType === STRUCTURE_SPAWN
  });

  if (sources.length > 0) {
    if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      // creep.moveTo(PathFinder.search(creep.pos, sources[0]), {visualizePathStyle: {stroke: '#ffaa00'}});
      creepNavigator.moveCreepTo(creep, sources[0]);
    }
  } else {
    console.info("Cannot find refuel sources");
    creep.say("confused...");
  }
};

module.exports = {
  run
};
