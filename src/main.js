/**
 * Main module for providing a loop entrypoint for the Screeps engine.
 */
"use strict";

require("./prototype");

const Brain = require("./Brain");
const MemoryCleaner = require("./utils/MemoryCleaner");

const memoryCleaner = new MemoryCleaner();
let brain = new Brain(memoryCleaner);
let legacyLogic = require("./deprecated/legacy");

/**
 * This is the logic loop function.
 */
const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  brain.loop();
  legacyLogic();
};

/**
 * Constructor function for the main module.
 * @param {Brain} brainInput the brain module for executing loop logic.
 * @param {function} legacyLogicInput the loop for the legacy logic.
 */
const build = (brainInput, legacyLogicInput) => {
  brain = brainInput;
  legacyLogic = legacyLogicInput;
  return { loop };
};

module.exports = {
  loop,
  build
};
