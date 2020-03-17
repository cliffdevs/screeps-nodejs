const spawnConfig = require("./spawn-config");
const partsConfig = require("./parts-config");
const spawnSelector = require("./spawn-selector");
const allRoles = require("../role/role-names");
const spawnOpts = require("./spawn-opts");

const getRoomMemory = roomName => {
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
  const role = creepConfig.options.memory.role;
  pendingSpawnCounters[role] = pendingSpawnCounters[role] || 0;
  pendingSpawnCounters[role]++;
};

const decreasePendingCounter = (roomName, creepConfig) => {
  const pendingSpawnCounters = getPendingSpawnCounters(roomName);
  const role = creepConfig.options.memory.role;
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
  const spawnQueue = getSpawnQueue(roomName);
  if (spawnQueue.length > 0) {
    return spawnQueue[0];
  }

  return null;
};

const unshiftSpawnQueue = (roomName, creepConfig) => {
  const spawnQueue = getSpawnQueue(roomName);
  spawnQueue.unshift(creepConfig);
};

const queueSpawnsForRole = (role, roomName) => {
  const workers = _.filter(Game.creeps, creep => creep.memory.role === role);
  console.log(`${role}'s: ` + workers.length);

  const roomLevel = Game.rooms[roomName].controller.level;

  if (workers.length + getPendingCounterForRole(roomName, role) < spawnConfig[roomLevel][role]) {
    const newName = role + Game.time;
    const creepConfig = {
      body: partsConfig.getParts(role, roomName),
      name: newName,
      options: spawnOpts.getSpawnOptions(roomName, role)
    };
    console.log("Pushing creep to spawnqueue: " + JSON.stringify(creepConfig));
    pushSpawnQueue(roomName, creepConfig);
  }
};

const attemptToSpawn = roomName => {
  const targetSpawner = spawnSelector.discoverSpawner(roomName);
  if (targetSpawner && !targetSpawner.spawning) {
    const creepConfig = peekSpawnQueue(roomName);
    if (creepConfig) {
      const result = targetSpawner.spawnCreep(creepConfig.body, creepConfig.name, creepConfig.options);
      if (result === OK) {
        popSpawnQueue(roomName);
        const spawnCreep = targetSpawner.spawning.name;
        targetSpawner.room.visual.text("🛠️" + spawnCreep, targetSpawner.pos.x + 1, targetSpawner.pos.y, {
          align: "left",
          opacity: 0.8
        });
      }
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

const prioritize = function(roomName, creepConfig) {
  getSpawnQueue(roomName);
  unshiftSpawnQueue(creepConfig);
};

module.exports = {
  prioritize,
  run
};
