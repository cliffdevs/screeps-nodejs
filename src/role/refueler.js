// refuelers are tower specific couriers
const { deliverEnergyToTarget } = require("../action/transfer-energy");
const locateNearestTowerNeedingFuel = require("../action/locate-nearest-tower-needing-fuel");

const run = creep => {
  const towerNeedingFuel = locateNearestTowerNeedingFuel(creep);
  if (towerNeedingFuel) {
    deliverEnergyToTarget(creep, target);
  }
};

module.exports = {
  run
};
