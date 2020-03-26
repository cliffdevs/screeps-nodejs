/**
 * Attacker is a role for creeps to go out and fight for objects in rooms.
 */
const harvesterLogic = require("./harvester");
const dumpExcess = require("../action/dump-excess-energy");
/**
 * execute the attack logic.
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags[creep.memory.target];
  const roomName = flag && flag.pos && flag.pos.roomName ? flag.pos.roomName : creep.memory.target;
  if (creep.room.name === roomName) {
    creep.memory.role = "builder";
    // if (creep.store.getFreeCapacity() === 0) {
    //   creep.say("dump");
    //   dumpExcess(creep);
    // } else {
    //   creep.say("harvest");
    //   harvesterLogic.run(creep);
    // }
  } else {
    creep.say(flag);
    creep.moveTo(flag);
  }
};
module.exports = {
  run
};
