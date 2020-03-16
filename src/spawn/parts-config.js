const partsProviders = require("./parts");

const getParts = role => {
  return partsProviders[role].getParts();
};

module.exports = {
  getParts
};
