const getRoomMemory = roomName => {
  return (Memory.rooms[roomName] = Memory.rooms[roomName] || {});
};

const getSpawners = roomName => {
  const roomMemory = getRoomMemory(roomName);
  return (roomMemory.spawners = Game.rooms[roomName].find(FIND_MY_SPAWNS).map(spawn => spawn.name));
};

const getSpawnerIndex = roomName => {
  const roomMemory = getRoomMemory(roomName);
  return roomMemory.spawnerIndex || 0;
};

const discoverSpawner = roomName => {
  const spawners = getSpawners(roomName);

  if (spawners.length > 0) {
    const targetSpawnerIndex = getSpawnerIndex(roomName);
    return Game.spawns[spawners[targetSpawnerIndex]];
  }
};

const incrementSpawner = roomName => {
  const roomMemory = getRoomMemory(roomName);
  const spawners = getSpawners(roomName);
  const spawnerIndex = getSpawnerIndex(roomName);
  roomMemory.spawnerIndex = spawnerIndex + 1 >= spawners.length ? 0 : spawnerIndex + 1;
};

module.exports = {
  discoverSpawner,
  incrementSpawner
};
