const { expect } = require("chai");
const { getFakeRoom, Memory } = require("../mock");
const _ = require("lodash");

describe("room", () => {
  let room;

  describe("execute", () => {

    beforeEach(() => {
      global.Memory = _.clone(Memory);
      room = getFakeRoom("E01S01");
    });

    it("should have an execute method", () => {
      expect(room.execute).to.be.a("function");
    });

    it("should execute without inputs or errors", () => {
      room.execute();
    });

    // it("should discover it's first directive", () => {
    //   const expectedDirective = "BUILD_SPAWNER";
    //   room.execute();
    //   expect(global.Memory.rooms[room.name].directive).to.equal(expectedDirective);
    // });
  });
});
