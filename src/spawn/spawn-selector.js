const getSpawners = roomName => {
  return (Memory.rooms[roomName].spawners = Memory.rooms[roomName].spawners || []);
};

const getSpawnerIndex = roomName => {
  return Memory.rooms[roomName].spawnerIndex || Memory.rooms[roomName].spawners[0];
};

const discoverSpawner = roomName => {
  const spawners = getSpawners(roomName);

  if (spawners.length > 0) {
    const targetSpawnerIndex = getSpawnerIndex(roomName);
    return spawners[targetSpawnerIndex];
  }
};

const incrementSpawner = roomName => {
  const spawners = getSpawners(roomName);
  const spawnerIndex = getSpawnerIndex(roomName);
  Memory.rooms[roomName].spawnerIndex = spawnerIndex + 1 >= spawners.length ? 0 : spawnerIndex + 1;
};

module.exports = {
  discoverSpawner,
  incrementSpawner
};
