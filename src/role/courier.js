"use strict";
/**
 * The courier is a role for creeps to discover dropped resources and carry them to storage.
 * They combo well with drop mining strategies.
 */

const nav = require("../nav/pathfinder");
const locationUtils = require("../util/locate");

/**
 *
 * @param {Creep} creep
 * @param {Structure} target
 */
const deliverEnergyToTarget = (creep, target) => {
  creep.say("🔄 delivering energy");

  const name = target.name || target.id;
  console.log("Transferring energy to " + target.structureType + ":" + name);

  const transferResult = creep.transfer(target, RESOURCE_ENERGY);

  if (transferResult == ERR_NOT_IN_RANGE) {
    nav.moveCreepTo(creep, target);
  } else if (transferResult !== OK) {
    console.log("Unable to transfer because error " + transferResult);
  }
};

/**
 *
 * @param {Creep} creep
 */
const findAndPickupDroppedEnergy = creep => {
  const foundEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  if (foundEnergy) {
    // creep.say("pickup");
    const pickupResult = creep.pickup(foundEnergy);
    if (pickupResult == ERR_NOT_IN_RANGE) {
      nav.moveCreepTo(creep, foundEnergy);
    } else if (pickupResult != OK) {
      creep.say("err" + pickupResult);
    }
  } else {
    creep.say("bored");
  }
};

/**
 *
 * @param {Creep} creep
 */
const carryEnergyToStorage = creep => {
  // const targets = locationUtils.findEnergyStorageLocations(creep);
  // if (targets.length > 0) {
  //   creep.say("deliver");
  //   deliverEnergyToTarget(creep, targets[0]);

  //   // // if empty
  //   if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
  //     creep.memory.delivering = false;
  //   }
  // }

  const target = locationUtils.findClosestEnergyStorage(creep);
  if (target) {
    creep.say("deliver");
    deliverEnergyToTarget(creep, target);
    // // if empty
    if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
      creep.memory.delivering = false;
    }
  } else {
    creep.say("holding");
  }
};

/**
 *
 * @param {Creep} creep
 */
const run = creep => {
  if (!creep.memory.delivering && creep.store.getFreeCapacity() > 0) {
    findAndPickupDroppedEnergy(creep);
  } else {
    creep.memory.delivering = true;
    carryEnergyToStorage(creep);
  }
};

module.exports = {
  run
};
