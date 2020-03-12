const spawnConfig = require("./spawn-config");
const partsConfig = require("./parts-config");
const spawnSelector = require("./spawn-selector");
const allRoles = require("../roles/role-names");

const getRoomMemory = roomName => {
  Memory.rooms = Memory.rooms || {};
  return (Memory.rooms[roomName] = Memory.rooms[roomName] || {});
};

const getPendingSpawnCounters = roomName => {
  const roomMemory = getRoomMemory(roomName);
  roomMemory.pendingSpawnCounters = roomMemory.pendingSpawnCounters || {};
  return roomMemory.pendingSpawnCounters;
};

const getPendingCounterForRole = (roomName, role) => {
  const pendingSpawnCounters = getPendingSpawnCounters(roomName);
  return pendingSpawnCounters[role] || 0;
};

const increasePendingCounter = (roomName, creepConfig) => {
  const pendingSpawnCounters = getPendingSpawnCounters(roomName);
  const role = creepConfig.spawnMemory.memory.role;
  pendingSpawnCounters[role] = pendingSpawnCounters[role] || 0;
  pendingSpawnCounters[role]++;
};

const decreasePendingCounter = (roomName, creepConfig) => {
  const pendingSpawnCounters = getPendingSpawnCounters(roomName);
  const role = creepConfig.spawnMemory.memory.role;
  pendingSpawnCounters[role] = pendingSpawnCounters[role] ? pendingSpawnCounters - 1 : 0;
};

const getSpawnQueue = roomName => {
  const roomMemory = getRoomMemory(roomName);
  return (roomMemory.spawnQueue = roomMemory.spawnQueue || []);
};

const pushSpawnQueue = (roomName, creepConfig) => {
  const spawnQueue = getSpawnQueue(roomName);
  spawnQueue.push(creepConfig);
  increasePendingCounter(roomName, creepConfig);
};

const popSpawnQueue = roomName => {
  const spawnQueue = getSpawnQueue(roomName);
  if (spawnQueue.length > 0) {
    const creepConfig = spawnQueue.shift();
    decreasePendingCounter(roomName, creepConfig);
    return creepConfig;
  }
  return undefined;
};

const peekSpawnQueue = roomName => {
  return getSpawnQueue(roomName)[0];
}

const queueSpawnsForRole = (role, roomName) => {
  const workers = _.filter(Game.creeps, creep => creep.memory.role === role);
  console.log(`${role}'s: ` + workers.length);

  const roomLevel = Game.rooms[roomName].controller.level;
  console.log(`detected room level and role ${roomLevel}:${role}`);
  console.log(JSON.stringify(spawnConfig[roomLevel]));
  console.log(JSON.stringify(spawnConfig[roomLevel][role]));
  if (workers.length + getPendingCounterForRole(roomName, role) < spawnConfig[roomLevel][role]) {
    const newName = role + Game.time;
    const creepConfig = {
      parts: partsConfig[roomLevel][role],
      name: newName,
      spawnMemory: { memory: { role } }
    };
    pushSpawnQueue(roomName, creepConfig);
  }
};

const attemptToSpawn = roomName => {
  const targetSpawner = spawnSelector.discoverSpawner(roomName);
  console.log('found targetSpawner ' + targetSpawner.name);
  if (targetSpawner && !targetSpawner.spawning) {
    const creepConfig = peekSpawnQueue(roomName);
    if (creepConfig) {
      console.log('preparing to spawn ' + creepConfig.name);
      const spawnResult = targetSpawner.spawnCreep(creepConfig.parts, creepConfig.name, creepConfig.spawnMemory);
      if (spawnResult === OK) {
        popSpawnQueue(roomName);
        const spawnCreep = targetSpawner.spawning.name;
        targetSpawner.room.visual.text("🛠️" + spawnCreep, targetSpawner.pos.x + 1, targetSpawner.pos.y, {
          align: "left",
          opacity: 0.8
        });
      } else {
        console.log('couldnt spawn err code ' + spawnResult)
      }
    }
  }
};

const queueAllSpawns = roomName => {
  allRoles.forEach(role => queueSpawnsForRole(role, roomName));
};

const run = function (roomName) {
  queueAllSpawns(roomName);
  attemptToSpawn(roomName);
};

module.exports = {
  run
};
