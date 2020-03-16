const expect = require("chai").expect;
const getreqd = require("../../tools/getreqd");

describe("getreqd", () => {
  const baseDir = "src";

  describe("should fix require statements from relative to screeps flat type", () => {
    it("should not append anything to root directory files", () => {
      const sourceFile = process.cwd() + "/src/utils/MemoryCleaner.js";
      const requirePath = "../main";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("main");
    });

    it("should resolve correctly for files in a nested directory", () => {
      const sourceFile = process.cwd() + "/src/utils/MemoryCleaner.js";
      const requirePath = "../prototype/room";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("prototype_room");
    });

    it("should correctly interpret require statements of directories with index files", () => {
      const sourceFile = process.cwd() + "/src/main";
      const requirePath = "./prototype";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("prototype_index");
    });

    it("should correctly interpret require statements of directories with index files in sibling directories", () => {
      const sourceFile = process.cwd() + "/src/main";
      const requirePath = "prototype";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("prototype_index");
    });

    it("should correctly interpret relative nested paths that have an index but are not the index", () => {
      const sourceFile = process.cwd() + "/src/role/remoteminer";
      const requirePath = "./harvester";
      const result = getreqd.convertRequirePathToScreepsPath(sourceFile, requirePath, baseDir);
      expect(result).to.be.equal("role_harvester");
    });
  });
});
