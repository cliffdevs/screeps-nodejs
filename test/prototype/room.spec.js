const { expect } = require("chai");
const { getFakeRoom, Memory } = require("../mock");
const _ = require("lodash");

describe("room", () => {
  let room;

  describe("execute", () => {
    beforeEach(() => {
      global.Memory = _.clone(Memory);
      room = getFakeRoom("E01S01");
      room.__proto__.execute.bind(room);
    });

    it("should have an execute method", () => {
      expect(room.execute).to.be.a("function");
    });

    it("should execute without inputs or errors", () => {
      room.execute();
    });
  });
});
