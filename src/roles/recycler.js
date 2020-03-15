// recyclers are suicidal bots that turn themselves in for energy when their mission is complete
const nav = require("../nav/pathfinder");

const run = creep => {
  creep.say("Kill me");
  const recycleResult = Game.spawns["Spawn1"].recycleCreep(creep);
  if (recycleResult == ERR_NOT_IN_RANGE) {
    // nav.moveCreepTo(creep, Game.spawns["Spawn1"]);
    creep.moveTo(Game.spawns["Spawn1"]);
  } else if (recycleResult != OK) {
    console.log("Unable to recyle: " + recycleResult);
  }
};

module.exports = {
  run
};
