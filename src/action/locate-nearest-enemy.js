/**
 *
 * @param {Room} room
 */
const findEnemies = room => {
  return room.find(FIND_HOSTILE_CREEPS);
};

module.exports = {
  findEnemies
};
