const roleFunctions = require("../roles");

Creep.prototype.execute = function() {
  const role = Memory.creeps[this.name].role;
  const roleFunction = roleFunctions[role];
  roleFunction.run(this);
};
