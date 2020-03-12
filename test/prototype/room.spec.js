const { expect } = require("chai");
const { Game, getFakeRoom, Memory } = require("../mock");
const _ = require("lodash");

describe("room", () => {
  let room;

  describe("execute", () => {
    beforeEach(() => {
      global.Game = _.clone(Game);
      global.Memory = _.clone(Memory);
      room = getFakeRoom("E01S01");
    });

    it("should have an execute method", () => {
      expect(room.execute).to.be.a("function");
    });

    it("should execute without inputs or errors", () => {
      room.execute();
    });

    it("should call the execute function of owned creeps in the room", () => {
      const ownedCreep = new Creep();
      ownedCreep.my = true;
      ownedCreep.name = "uncle";
      ownedCreep.owner = "bob";
      ownedCreep.execute = sinon.stub();

      const enemyCreep = new Creep();
      enemyCreep.my = false;
      enemyCreep.name = "idiot";
      enemyCreep.owner = "bernie";
      enemyCreep.execute = sinon.stub();

      global.Game.creeps = [
        ownedCreep,
        enemyCreep
      ];

      room.execute();
      expect(ownedCreep.execute.calledOnce).is.true;
      expect(enemyCreep.execute.called).is.false;
    })
  });
});
