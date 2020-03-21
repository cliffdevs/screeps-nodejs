const energyTiers = [300];

const partTiers = {
  300: [WORK, CARRY, CARRY, MOVE, MOVE]
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
