// maxharvesters are drop miners, they require couriers to be effective
const mineRefueler = require("../action/refuel-from-energy-source");

const roleMaxHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.store.getFreeCapacity() > 0) {
      mineRefueler.run(creep);
    } else {
      creep.drop(RESOURCE_ENERGY);
    }
  }
};

module.exports = roleMaxHarvester;
