const roleFunctions = require("../role");

const setSpawnInMemory = creepName => {
  Memory.creeps[creepName].spawn =
    Memory.creeps[creepName].spawn ||
    Game.creeps[creepName].room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_SPAWN
    })[0].name;
};

Creep.prototype.execute = function() {
  console.log("inside creep execute");
  setSpawnInMemory(this.name);
  const role = Memory.creeps[this.name].role;
  const roleFunction = roleFunctions[role];
  roleFunction.run(this);
};
