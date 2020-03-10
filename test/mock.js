/**
 * Module for commonly useful mock data or stub methods.
 */
"use strict";
const Room = require("./globals/Room");

const Game = {
  cpu: {
    bucket: 100,
    getUsed: () => 20,
    limit: 20,
    tickLimit: 20
  },
  creeps: {},
  rooms: {},
  spawns: {},
  time: 12345
};

const Memory = {
  creeps: {},
  rooms: {}
};

const getFakeCreep = () => {
  return new Creep();
};

const getFakeRoom = (roomName, mergeObject) => {
  const room = new Room(roomName);
  return room;
  // return Object.assign(room, mergeObject);
};

module.exports = {
  Game,
  Memory,
  getFakeCreep,
  getFakeRoom
};
