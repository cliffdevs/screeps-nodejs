const creepMover = require("../nav/pathfinder");

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
        (object.structureType == STRUCTURE_WALL && object.hits < object.hitsMax / 10) ||
        (object.structureType == STRUCTURE_RAMPART && object.hits < object.hitsMax / 10)
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

module.exports = {
  findNearestConstructionSite,
  constructTarget,
  findNearestThingToRepair,
  repairThing
};
