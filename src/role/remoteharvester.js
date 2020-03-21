/**
 * Attacker is a role for creeps to go out and fight for objects in rooms.
 */
const harvesterLogic = require("./harvester");
/**
 * execute the attack logic.
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags[creep.memory.target];
  const roomName = flag && flag.pos && flag.pos.roomName ? flag.pos.roomName : creep.memory.target;
  if (roomName) {
    if (creep.room.name === roomName) {
      harvesterLogic.run(creep);
    }
  }
};
module.exports = {
  run
};
