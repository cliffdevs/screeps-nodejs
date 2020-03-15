// remote miners are harvesters for foreign rooms.
// const creepMover = require("../nav/pathfinder");

const roleHavester = require("./harvester");

/**
 *
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags["Mine"];
  if (flag) {
    if (creep) {
      Memory.rooms = Memory.rooms ? Memory.rooms : {};
      Memory.rooms[flag.pos.roomName] = Memory.rooms[flag.pos.roomName] ? Memory.rooms[flag.pos.roomName] : {};
      Memory.rooms[flag.pos.roomName].miners = Memory.rooms[flag.pos.roomName].miners || [];
      if (!Memory.rooms[flag.pos.roomName].miners.includes(creep.name)) {
        Memory.rooms[flag.pos.roomName].miners.push(creep.name);
      }
      if (creep.room.name === flag.pos.roomName) {
        roleHavester.run(creep);
      } else {
        creep.say(flag);
        creep.moveTo(flag);
        // creepMover.moveCreepTo(creep, flag);
      }
    }
  }
};
module.exports = {
  run
};
