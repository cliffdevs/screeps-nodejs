const spawnConfig = require("./spawn-config");
const partsConfig = require("./parts-config");
const spawnSelector = require("./spawn-selector");
const allRoles = require("../roles/role-names");

const getPendingSpawnCounters = roomName => {
  return (Game.rooms[roomName].pendingSpawnCounters = Game.rooms[roomName].pendingSpawnCounters || {});
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
  return (Game.rooms[roomName].spawnQueue = Game.rooms[roomName].spawnQueue || []);
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

const queueSpawnsForRole = (role, roomName) => {
  const workers = _.filter(Game.creeps, creep => creep.memory.role === role);
  console.log(`${role}'s: ` + workers.length);

  const roomLevel = Game.rooms[roomName].controller.level;
  if (workers.length + getPendingCounterForRole(role) < spawnConfig[roomLevel][role]) {
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
  if (targetSpawner && !targetSpawner.spawning) {
    const creepConfig = popSpawnQueue(roomName);
    if (creepConfig) {
      targetSpawner.spawnCreep();

      const spawnCreep = targetSpawner.spawning.name;
      targetSpawner.room.visual.text("🛠️" + spawnCreep.memory.role, targetSpawner.pos.x + 1, targetSpawner.pos.y, {
        align: "left",
        opacity: 0.8
      });
    }
  }
};

const queueAllSpawns = roomName => {
  allRoles.forEach(role => queueSpawnsForRole(role, roomName));
};

const run = function(roomName) {
  queueAllSpawns(roomName);
  attemptToSpawn(roomName);
};

module.exports = {
  run
};
