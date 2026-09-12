"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { app } = require("electron");
const file = require("./file");

const { log } = console;

// First start after the rename from Kuro: bring the previous profile along
// (settings, list themes, window state, shortcuts). The Microsoft account has
// to be signed in again: Chromium encrypts cookies with a key stored under the
// application's name, so the old ones cannot be read by the new name.
function migrateProfile() {
  const target = app.getPath("userData");
  const source = file.legacyUserData;

  try {
    const targetUsed = fs.existsSync(target) && fs.readdirSync(target).length > 0;
    if (targetUsed || !fs.existsSync(source) || source === target) {
      return;
    }

    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(source, target, {
      recursive: true,
      // Single-instance lock and Chromium's own lock files belong to the
      // running (old) app, not to the copy
      filter: source => !/^(Singleton|lockfile$|LOCK$)/.test(path.basename(source)),
    });

    const oldConfig = path.join(target, file.legacyLocalConfigName);
    if (fs.existsSync(oldConfig) && !fs.existsSync(file.localConfig)) {
      fs.renameSync(oldConfig, file.localConfig);
    }

    log(`Copied the previous profile from ${source} to ${target}`);
  } catch (error) {
    log(error);
  }
}

module.exports = { migrateProfile };
