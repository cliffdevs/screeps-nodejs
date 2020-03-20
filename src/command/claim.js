const spawner = require("../spawn/spawner");
const partsConfig = require("../spawn/parts-config");

const run = ({ action, from, to, squad, squadRoles }) => {
  console.log("prioritizing " + to);
  squadRoles
    .map(role => {
      return {
        body: partsConfig.getParts(role, from),
        name: `${from}${squad}${role}${Game.time}`,
        options: {
          memory: {
            role: role,
            action: action,
            home: from,
            target: to
          }
        }
      };
    })
    .map(creepConfig => spawner.prioritize(from, creepConfig));
};

module.exports = {
  run
};
