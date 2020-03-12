"use strict";

/**
 * Proxy property to get a collection of all creeps in a room.
 */
Object.defineProperty(Room.prototype, 'creeps', {
  get: function () {
    return _.filter(Game.creeps, creep => creep.room === this.name && creep.my);
  },
  enumerable: false,
  configurable: false
});

Object.defineProperty(Room.prototype, 'spawner', {
  get: function () {
    return this._spawner;
  },
  set: function (spawnerFunction) {
    this._spawner = spawnerFunction;
  },
  enumerable: false,
  configurable: true
});

Room.prototype.execute = function () {
  Room.prototype.creeps.map(creep => creep.execute());
  this.spawner(this.name);
};

// room bootstrapping priority
// 0. plan base layout
// 1. place spawner
// 2. assign and spawn one miner per source
// 3. assign and spawn harverster to carry energy from miner to destination
// 4. build extensions for additional energy storage
// 4. plan path from spawn to sources
// 5. build roads from spawn to sources
// 6. assign builders
// 7. spawn upgraders

// check if room has a directive
// check if room has a spawn
// if it does, execute owned room logic
// check if room is bootstrapped
// if not, set the room priority to bootstrap
// if so, set the room priority farm and level up while maintaining structures
// trigger additional logic at each additional room controller level
// if it doesn't execute unowned room logic
// check if room is assigned as a reserve target
// if so check if creeps are assigned a reservation duty
// if not queue a spawn of a reserver from the nearest base
// check if resources are assigned to be mined, and from which room
// if not, check if they should be by checking the range from the nearest base and queuing an assignment
