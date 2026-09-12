"use strict";
const path = require("node:path");
const { homedir } = require("node:os");
const electron = require("electron");

// Name Electron uses for its per-user data directory (package.json productName)
const appName = "Opensource ToDo";
// The project was called Kuro before the fork; its profile is migrated on the
// first start (see src/migrate.js and src/config.js)
const previousAppName = "Kuro";

// Mirrors Electron's default `userData` location so the renderer (preload),
// where `electron.app` is unavailable, resolves the same directory as the
// main process. On Linux this follows the XDG base directory spec.
function defaultUserData(name) {
  const { env, platform } = process;

  if (platform === "win32") {
    const appData = env.APPDATA || path.join(homedir(), "AppData", "Roaming");
    return path.join(appData, name);
  }

  if (platform === "darwin") {
    return path.join(homedir(), "Library", "Application Support", name);
  }

  const configHome = env.XDG_CONFIG_HOME || path.join(homedir(), ".config");
  return path.join(configHome, name);
}

function userData() {
  const { app } = electron;

  if (app && typeof app.getPath === "function") {
    try {
      return app.getPath("userData");
    } catch {}
  }

  return defaultUserData(appName);
}

module.exports = {
  icon: path.join(__dirname, "../static/Icon.png"),
  // Locations used before the fork, kept only for migration
  legacyLocalConfig: path.join(homedir(), ".kuro.json"),
  legacyLocalConfigName: "kuro.json",
  legacyUserData: defaultUserData(previousAppName),
  get localConfig() {
    return path.join(userData(), "todo.json");
  },
  preload: path.join(__dirname, "./browser.js"),
  style: path.join(__dirname, "./style"),
  trayIcon: path.join(__dirname, "../static/IconTray.png"),
};
