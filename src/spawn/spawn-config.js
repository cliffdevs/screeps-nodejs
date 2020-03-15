/**
 * Contains a config mapping of how many of each role of screep to
 * have spawned on hand at each room controller level.
 */
module.exports = {
  1: {
    harvester: 2,
    builder: 1,
    upgrader: 2
  },
  2: {
    harvester: 2,
    carry: 2,
    upgrader: 1,
    builder: 1
  },
  3: {
    miner: 2,
    carry: 2,
    upgrader: 2,
    defender: 1,
    builder: 2
  }
};
