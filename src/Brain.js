"use strict";

const commandExecutor = require("./command/command");

/**
 * All AI logic starts here.
 */
class Brain {
  /**
   * Constructor for dependency injection.
   * @param {MemoryCleaner} memoryCleaner
   */
  constructor(memoryCleaner) {
    this.memoryCleaner = memoryCleaner;
  }

  /**
   * AI logic to be executed on each tick.
   */
  loop() {
    const isCpuBelowLimit = function() {
      const gameTimeGreaterThanOneSecond = Game.time > 1000;
      const cpuBucketLessThanTwiceCpuTickLimit = Game.cpu.bucket < Game.cpu.tickLimit * 2;
      const cpuBucketLessThanTenTimesCpuLimit = Game.cpu.bucket < Game.cpu.limit * 10;

      if (gameTimeGreaterThanOneSecond && cpuBucketLessThanTwiceCpuTickLimit && cpuBucketLessThanTenTimesCpuLimit) {
        console.log(
          `${Game.time} Skipping tick CPU Bucket too low. bucket: ${Game.cpu.bucket} tickLimit: ${Game.cpu.tickLimit} limit: ${Game.cpu.limit}`
        );
        return false;
      }

      return true;
    };

    if (!isCpuBelowLimit()) {
      return; // exit, come back next tick
    }

    Memory.time = Game.time;
    this.memoryCleaner.purge();

    commandExecutor.run();

    for (const roomName in Game.rooms) {
      Game.rooms[roomName].execute();
    }
  }
}

module.exports = Brain;
