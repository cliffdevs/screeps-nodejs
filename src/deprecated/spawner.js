const spawner = {
  run: function() {
    const harvesters = _.filter(Game.creeps, creep => creep.memory.role == "harvester");
    console.log("Harvesters: " + harvesters.length);
    const builders = _.filter(Game.creeps, creep => creep.memory.role == "builder");
    console.log("Builders: " + builders.length);
    const upgraders = _.filter(Game.creeps, creep => creep.memory.role == "upgrader");
    console.log("Upgraders: " + upgraders.length);

    if (harvesters.length < 2) {
      const newName = "Harvester" + Game.time;
      console.log("Spawning new harvester: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "harvester" } });
    }
    if (builders.length < 2) {
      const newName = "Builder" + Game.time;
      console.log("Spawning new builder: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "builder" } });
    }
    if (upgraders.length < 2) {
      const newName = "Upgrader" + Game.time;
      console.log("Spawning new upgrader: " + newName);
      Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "upgrader" } });
    }

    if (Game.spawns["Spawn1"].spawning) {
      const spawnCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
      Game.spawns["Spawn1"].room.visual.text(
        "🛠️" + spawnCreep.memory.role,
        Game.spawns["Spawn1"].pos.x + 1,
        Game.spawns["Spawn1"].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  }
};

module.exports = spawner;
