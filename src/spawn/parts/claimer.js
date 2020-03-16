const energyTiers = [800, 1100, 1400, 1700, 5300, 12000];

const partTiers = {
  800: [CLAIM, MOVE],
  1100: [CLAIM, MOVE],
  1400: [CLAIM, CLAIM, MOVE, MOVE],
  1700: [CLAIM, CLAIM, MOVE, MOVE],
  5300: [CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  12000: [CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
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
