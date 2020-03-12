/**
 * Main module for providing a loop entrypoint for the Screeps engine.
 */
"use strict";

require("./prototype");

const Brain = require("./Brain");
const MemoryCleaner = require("./utils/MemoryCleaner");

const memoryCleaner = new MemoryCleaner();
let brain = new Brain(memoryCleaner);

/**
 * This is the logic loop function.
 */
const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  brain.loop();
};

/**
 * Constructor function for the main module.
 * @param {Brain} brainInput the brain module for executing loop logic.
 */
const build = (brainInput) => {
  brain = brainInput;
  return { loop };
};

module.exports = {
  loop,
  build
};
