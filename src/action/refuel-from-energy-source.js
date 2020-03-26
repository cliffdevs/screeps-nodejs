const creepNavigator = require("../nav/pathfinder");

const findNearestEnergySource = creep => {
  return creep.pos.findClosestByPath(FIND_SOURCES);
};

const findFirstEnergySource = creep => {
  return creep.room.find(FIND_SOURCES_ACTIVE);
};

const getEnergySource = creep => {
  if (creep.memory.energySource) {
    return creep.room.find(FIND_SOURCES, {
      filter: source => {
        return source.id === creep.memory.energySource;
      }
    })[0];
  }

  console.log("ERROR, creep couldn't find it's assigned energy source and will default to nearest.");
  const source = findNearestEnergySource(creep);
  creep.memory.energySource = source.id;
  return source;
};

const run = creep => {
  creep.say("🔄 harvest");

  // const source = findNearestEnergySource(creep);
  const source = getEnergySource(creep);
  const harvestResult = creep.harvest(source);
  if (harvestResult == ERR_NOT_IN_RANGE) {
    creepNavigator.moveCreepTo(creep, source);
  }
};

module.exports = {
  run
};
