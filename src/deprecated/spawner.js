const spawnConfig = require("./parts/spawns");

class Spawner {
  constructor(partSelector, spawnerName) {
    this.partSelector = partSelector;
    this.spawnName = spawnerName;
  }

  run() {
    const room = getRoom(this.spawnerName);

    const spawn = (role) => {
      const workers = _.filter(Game.creeps, creep => creep.memory.role === role);
      console.log(role + ": " + workers.length);
      const roleAmount = spawnConfig[room.controller.level[role]];
      if (roleAmount && workers.length < roleAmount) {
        const newName = role + Game.time;
        console.log("Spawning new " + role + ": " + newName);
        Game.spawns[this.spawnName].spawnCreep(this.partSelector.findParts(role), newName, { memory: { role } });
      }
    };

    spawn("harvester");
    spawn("builder");
    spawn("upgrader");

    if (Game.spawns[this.spawnName].spawning) {
      const spawnCreep = Game.creeps[Game.spawns[this.spawnName].spawning.name];
      room.visual.text(
        "🛠️" + spawnCreep.memory.role,
        Game.spawns[this.spawnName].pos.x + 1,
        Game.spawns[this.spawnName].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  }
};

const getRoom = (spawnerName) => {
  return Game.spawns[spawnerName].room;
}

module.exports = Spawner;
