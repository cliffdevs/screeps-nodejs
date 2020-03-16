const isMinerRole = (roomName, role) => {
  return (
    role === "harvester" ||
    "maxharvester" ||
    (Game.rooms[roomName].controller.level >= 3 && (role === "builder" || role === "upgrader"))
  );
};

const getMinerEnergySource = roomName => {
  const roomMemory = (Memory.rooms[roomName] = Memory.rooms[roomName] || {});
  const sources = (roomMemory.sources = roomMemory.sources || Game.rooms[roomName].find(FIND_SOURCES));
  if (sources && sources.length > 0) {
    roomMemory.previousSourceIndex = roomMemory.previousSourceIndex || 0;
    let targetSourceIndex = 0;
    if (roomMemory.previousSourceIndex + 1 < roomMemory.sources.length) {
      targetSourceIndex++;
    }

    roomMemory.previousSourceIndex = targetSourceIndex;
    return sources[targetSourceIndex];
  }
};

/**
 * Provide custom spawn options for the target creep based on the room and role it will take.
 * @param {string} roomName the name of the room.
 * @param {string} role the name of the creeps role.
 */
const getSpawnOptions = (roomName, role) => {
  const options = {
    memory: {
      role: role
    }
  };

  options.energySource = getMinerEnergySource(roomName);

  return options;
};

module.exports = {
  getSpawnOptions
};
