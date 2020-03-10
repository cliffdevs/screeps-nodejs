/*
 * adapted to work for my needs, originally taken from gulp-screeps
 * https://github.com/pcmulder/gulp-screeps
 *
 * Copyright (c) 2015 Patrick Mulder
 * Licensed under the MIT license.
 */

"use strict";

const PluginError = require("plugin-error"),
  log = require("fancy-log"),
  http = require("http"),
  https = require("https"),
  util = require("util"),
  path = require("path");

const PLUGIN_NAME = "gulp-screeps-cliffdevs";

class ScreepsCodeUploader {
  constructor(options) {
    this.opt = loadOptions(options);
    this.modules = {};

    this.bufferContents.bind(this);
    this.endStream.bind(this);
  }

  bufferContents(contents, file) {
    // ignore empty files
    if (contents && contents.length === 0) {
      return;
    }

    const name = path.basename(file.path).replace(/\.js$/, "");
    this.modules[name] = contents.toString("utf-8");
  }

  endStream(callback) {
    end(this.opt, this.modules, callback);
  }
}

const end = (opt, modules, cb) => {
  const request = (opt.secure ? https : http).request;
  const reqOpts = {
    hostname: opt.host,
    port: opt.port,
    path: opt.ptr ? "/ptr/api/user/code" : "/api/user/code",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  };

  if (opt.token) {
    reqOpts.headers["x-token"] = opt.token;
  } else if (opt.email && opt.password) {
    reqOpts.auth = opt.email + ":" + opt.password;
  }

  const req = request(reqOpts, function(res) {
    res.setEncoding("utf8");

    let data = "";

    res.on("data", function(chunk) {
      data += chunk;
    });

    res.on("end", function() {
      try {
        data = JSON.parse(data);
      } catch (e) {}
      if (data.ok) {
        let msg = "Committed to Screeps account";
        if (opt.email) {
          msg += ' "' + opt.email + '"';
        }
        if (opt.token) {
          msg += " with token";
        }
        if (opt.branch) {
          msg += ' branch "' + opt.branch + '"';
        }
        if (opt.host !== "screeps.com") {
          msg += ' on server "' + opt.host + '"';
        }
        msg += ".";
        if (res.headers["x-ratelimit-limit"]) {
          const limit = res.headers["x-ratelimit-limit"];
          const remaining = res.headers["x-ratelimit-remaining"];
          const reset = res.headers["x-ratelimit-reset"];
          msg +=
            "  RateLimiting: (" +
            remaining +
            "/" +
            limit +
            " " +
            (parseInt(reset) * 1000 - Date.now()) +
            "ms to reset)";
        }
        log(msg);
        cb();
      } else {
        log("Error while committing to Screeps: " + util.inspect(data));
        cb("Error while committing to Screeps: " + util.inspect(data));
      }
    });

    res.on("error", cb);
  });

  const data = {
    branch: opt.branch,
    modules: modules
  };

  req.write(JSON.stringify(data));
  req.end();
};

/**
 * Load the options with sensible defaults.
 * @param {object} options
 */
const loadOptions = function(options) {
  let opt = options || {};

  if (typeof opt.host !== "string") {
    opt.host = "screeps.com";
  }

  if (typeof opt.port !== "number") {
    opt.port = 443;
  }

  if (typeof opt.secure !== "boolean") {
    opt.secure = opt.port === 443;
  }

  if ((typeof opt.email !== "string" || typeof opt.password !== "string") && typeof opt.token !== "string") {
    throw new PluginError(PLUGIN_NAME, "Please provide account information");
  }

  if (typeof opt.branch !== "string") {
    opt.branch = "default";
  }

  return opt;
};

module.exports = ScreepsCodeUploader;
