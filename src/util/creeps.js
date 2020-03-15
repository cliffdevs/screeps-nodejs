const buildCommands = require("../action/find-nearest-construction");

const getCreepsByRoomName = roomName => {
  return Game.rooms[roomName].find(FIND_CREEPS);
};

const getCreepByName = creepName => {
  return Game.creeps[creepName];
};

const dumpResources = creepName => {
  const creep = getCreepByName(creepName);
  const copyRole = creep.memory.role;
  creep.memory.role = "none";
  const site = buildCommands.findNearestConstructionSite(creep);
  buildCommands.constructTarget(creep, site);
  creep.memory.role = copyRole;
};

const changeRole = (creepName, role) => {
  const creep = getCreepByName(creepName);
  creep.memory.role = role;
};

module.exports = {
  getCreepsByRoomName,
  getCreepByName,
  dumpResources,
  changeRole
};
