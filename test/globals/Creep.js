class Creep {
  constructor() {}
}

Object.defineProperty(Creep.prototype, "name", {
  get: function() {
    return this._name;
  },
  set: function(update) {
    this._name = update;
  },
  enumerable: false,
  configurable: false
});

Object.defineProperty(Creep.prototype, "owner", {
  get: function() {
    return this._owner;
  },
  set: function(update) {
    this._owner = update;
  },
  enumerable: false,
  configurable: false
});

Object.defineProperty(Creep.prototype, "my", {
  get: function() {
    return this._my;
  },
  set: function(update) {
    this._my = update;
  },
  enumerable: false,
  configurable: false
});

module.exports = Creep;
