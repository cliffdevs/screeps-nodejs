const roleFunctions = require("../role");

Creep.prototype.execute = function() {
  console.log("inside creep execute");
  const role = Memory.creeps[this.name].role;
  const roleFunction = roleFunctions[role];
  roleFunction.run(this);
};
