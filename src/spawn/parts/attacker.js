const energyTiers = [300, 550, 800, 1100, 1400, 1700, 5300, 12000];

const partTiers = {
  300: [ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE],
  550: [ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE],
  800: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 70 tough cost, 10 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 500 move cost
  ], // 750 total
  1100: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 110 tough cost, 14 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 700 move cost
  ], // 1050 total
  1400: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 110 tough cost, 14 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 700 move cost
  ], // 1050 total
  1700: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 110 tough cost, 14 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 700 move cost
  ], // 1050 total
  5300: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 110 tough cost, 14 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 700 move cost
  ], // 1050 total
  12000: [
    ATTACK,
    ATTACK,
    ATTACK, // 240 attack cost
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH,
    TOUGH, // 110 tough cost, 14 parts
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE // 700 move cost
  ] // 1050 total
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
