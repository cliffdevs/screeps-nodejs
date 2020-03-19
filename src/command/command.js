// find command flags and interpret the outcome
const actions = {
  attack: require("./attack")
};

const convertFlagToCommand = ([flagName, flag]) => {
  const commandComponents = flag.name.split(".");
  const commandDetails = {
    action: commandComponents[1],
    from: commandComponents[3],
    to: flagName,
    squad: commandComponents[4],
    squadRoles: commandComponents.slice(5, commandComponents.length)
  };

  console.log(JSON.stringify(commandDetails));
  return commandDetails;
};

const discoverCommands = () => {
  console.log("Discovering commands...");
  const commands = Object.entries(Game.flags)
    .filter(([_flagName, flag]) => !flag.memory.flagAcknowledged)
    .map(convertFlagToCommand);

  console.log("Found " + commands.length + " new commands.");

  return commands;
};

const run = () => {
  const commands = discoverCommands();
  commands.map(command => {
    actions[command.action].run(command);
  });
};

module.exports = {
  run
};
