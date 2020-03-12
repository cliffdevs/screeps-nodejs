class Room {
  constructor() {}
}

Object.defineProperty(Room.prototype, 'name', {
  get: function() {
    return this._name;
  },
  set: function(updateName) {
    this._name = updateName;
  },
  enumerable: false,
  configurable: false
})

module.exports = Room;
