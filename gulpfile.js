"use strict";

const gulp = require("gulp");
const rename = require("gulp-rename");
const insert = require("gulp-insert");
const clean = require("gulp-clean");
const git = require("git-rev-sync");
const getReqd = require("./tools/getreqd");

const commitdate = git.date();

function cleanTask() {
  return gulp.src("dist/", { read: false, allowEmpty: true }).pipe(clean());
}

function copyTask() {
  let src;
  src = gulp.src("src/**/*.js");
  return src
    .pipe(insert.transform(cleanRequirements))
    .pipe(rename(renameFiles))
    .pipe(insert.transform(appendVersion))
    .pipe(gulp.dest("dist/"));
}

function renameFiles(path) {
  let parts = path.dirname.match(/[^/\\]+/g);
  let name = "";
  for (let i in parts) {
    if (parts[i] !== ".") {
      name += parts[i] + "_";
    }
  }
  name += path.basename;
  path.basename = name;
  path.dirname = "";
}

function appendVersion(contents, file) {
  let name = file.path.match(/[^/\\]+/g);
  name = name[name.length - 1];
  if (name === "version.js") {
    return `${contents}\nglobal.SCRIPT_VERSION = ${+commitdate}`; // jshint ignore:line
  }
  return contents;
}

function cleanRequirements(contents, file) {
  let updatedContents = "";
  const lines = contents.split("\n");
  for (let line of lines) {
    if (line.match(/[.]*\/\/ Compiler: IgnoreLine[.]*/)) {
      continue;
    }
    let reqStr = line.match(/(?:require\(")([^_a-zA-Z0-9]*)([^"]*)/);
    if (reqStr && reqStr != "") {
      const reqstring = reqStr.slice(1).join('');
      let rePathed = getReqd.convertRequirePathToScreepsPath(file.path, reqstring, "src");
      console.log("correcting require path in " + file.path + " from " + reqstring + " to " + rePathed);
      line = line.replace(/require\("([\.\/]*)([^"]*)/, 'require("' + rePathed);
    }

    updatedContents += line + "\n";
  }

  return updatedContents;
}

function deployTask(cb) {
  const credentials = require("./credentials");
  const ScreepsUploader = require("./tools/deploy");
  const uploader = new ScreepsUploader(credentials);

  function end() {
    uploader.endStream(cb);
  }

  function err(err) {
    console.log("screeps upload error", err);
  }

  return gulp
    .src("dist/*.js")
    .pipe(
      insert.transform(function (contents, file) {
        uploader.bufferContents(contents, file);
        return contents;
      })
    )
    .pipe(
      insert.transform(function (contents, file) {
        console.log("finished uploading file: " + file.path);
        return contents;
      })
    )
    .on("end", end)
    .on("finished", end)
    .on("error", err);
}

module.exports = {
  default: gulp.series(cleanTask, copyTask, deployTask),
  deploy: gulp.series(cleanTask, copyTask, deployTask),
  stage: gulp.series(cleanTask, copyTask)
};
