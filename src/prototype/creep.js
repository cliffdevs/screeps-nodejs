const builderLogic = require("../deprecated/role.builder");
const harvesterLogic = require("../deprecated/role.harvester");
const upgraderLogic = require("../deprecated/role.upgrader");

/**
 * Crazy method to rebind role behaviors at runtime.
 */
Object.defineProperty(Creep.prototype, 'logic', {
    get: function () {
        return this._logic = this._logic || {
            "builder": builderLogic.run,
            "harvester": harvesterLogic.run,
            "upgrader": upgraderLogic.run
        };
    },
    set: function (updated) {
        this._logic = updated;
    }
});

Creep.prototype.execute = function () {
    const role = Memory.creeps[this.name].role;
    const roleFunction = this.logic[role]
    roleFunction(this);
};
