const energyTiers = [300, 550, 800, 1100, 1400, 1700, 5300, 12000];

const partTiers = {
  300: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  550: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
  800: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  1100: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  1400: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  1700: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  5300: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  12000: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
};

const sortHighestToLowest = (t1, t2) => (t1 > t2 ? -1 : 1);

const filterCurrentCapacityGreaterThan = capacity => tier => capacity >= tier;

const selectPartTier = roomName => {
  const capacity = Game.rooms[roomName].energyCapacityAvailable;
  return energyTiers.filter(filterCurrentCapacityGreaterThan(capacity)).sort(sortHighestToLowest)[0];
};

const getParts = roomName => {
  return partTiers[selectPartTier(roomName)];
};

module.exports = {
  getParts
};
