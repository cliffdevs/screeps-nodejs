const visualCostMatrix = room => {
  //todo read and set color weights
};

const getColor = creep => {
  if (!creep.memory.path_color) {
    creep.memory.path_color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  return creep.memory.path_color;
};

const roomCallback = roomName => {
  let room = Game.rooms[roomName];
  if (!room) return;

  let costs = new PathFinder.CostMatrix();

  room.find(FIND_STRUCTURES).forEach(struct => {
    if (struct.structureType === STRUCTURE_ROAD) {
      // favor roads over all types
      costs.set(struct.pos.x, struct.pos.y, 1);
    } else if (
      struct.structureType === STRUCTURE_CONTAINER ||
      struct.structureType === STRUCTURE_EXTENSION ||
      struct.structureType === STRUCTURE_SPAWN ||
      (struct.structureType === STRUCTURE_RAMPART && !struct.my)
    ) {
      costs.set(struct.pos.x, struct.pos.y, 255);

      // can't walk through non-walkable buildings
      costs.set(struct.pos.x, struct.pos.y, 255);
    }

    // avoid creeps
    room.find(FIND_CREEPS).forEach(creep => {
      costs.set(creep.pos.x, creep.pos.y, 255);
    });
  });

  return costs;
};

const PATH_OPTIONS = {
  plainCost: 2,
  swampCost: 10,
  // heuristicWeight: 1.9,
  roomCallback: roomCallback
};

const drawPath = (creep, path) => {
  creep.room.visual.poly(path, { stroke: getColor(creep), strokeWidth: 0.3, opacity: 0.5, lineStyle: "dashed" });
};

const moveCreepTo = (creep, target) => {
  const path = PathFinder.search(creep.pos, target, PATH_OPTIONS).path;
  drawPath(creep, path);
  const moveResult = creep.moveByPath(path);

  if (!(OK === moveResult || ERR_TIRED === moveResult)) {
    creep.say(moveResult);
    console.log(creep.name + " unable to move to target errorCode: " + moveResult);
  }

  return moveResult;
};

module.exports = {
  moveCreepTo
};
