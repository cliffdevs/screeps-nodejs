const partsConfig = require("./parts/parts");

class PartSelector {
    constructor() {
        this.findParts.bind(this);
    }

    findParts(role, level) {
        return partsConfig[role][level];
    }
}