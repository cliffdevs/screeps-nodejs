const partsProviders = require("./parts");

const getParts = (role, roomName) => {
  return partsProviders[role].getParts(roomName);
};

module.exports = {
  getParts
};
