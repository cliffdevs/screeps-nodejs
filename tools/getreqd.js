const fs = require("fs");
const path = require("path");

/**
 * Converts normal NodeJS require paths into the path expected by Screeps when flattening directories into the file name.
 *
 * A require statement of a file src/logic/myfile.js will now look like require("./src_logic_myfile").
 * This is also probably undesirable if you have a project structure like this:
 * src/main.js
 * test/main.spec.js
 * To overcome this, provide your relative path prefix, and it will be removed from the generated path:
 * convertRequirePathToScreepsPath('./logic/myfile', 'src') == "./logic_myfile"
 * @param absoluteFilePath the path to this file
 * @param requirePath the path in the require statement in the file
 * @param additionalRelativePathPrefix an additional path prefix to remove from the screeps name. Use this if you have a sub directory for your source root.
 */
const convertRequirePathToScreepsPath = (absoluteFilePath, requirePath, additionalRelativePathPrefix) => {
  const baseDir = process.cwd();
  const fileParentDir = path.dirname(absoluteFilePath);
  const changeDir = path.relative(baseDir, fileParentDir);
  const absoluteDependencyPath = path.resolve(baseDir, changeDir, requirePath);
  const removeSubPath = additionalRelativePathPrefix ? `${baseDir}/${additionalRelativePathPrefix}/` : `${baseDir}/`;
  const contextPath = absoluteDependencyPath.replace(removeSubPath, "");
  const screepsPath = `${contextPath.replace(/\//gi, "_")}${getSuffix(absoluteDependencyPath)}`;

  return screepsPath;
};

const getSuffix = (absoluteDependencyPath) => {
  if (isFile(absoluteDependencyPath)
    || isFile(absoluteDependencyPath + ".js")
    || isFile(absoluteDependencyPath + ".json")) {
    return ""
  }

  return "_index";
}

const isFile = (absoluteDependencyPath) => {
  try {
    const fileStats = fs.statSync(absoluteDependencyPath);
    return fileStats.isFile();
  } catch (err) {
    return false;
  }
}

module.exports = {
  convertRequirePathToScreepsPath
};
