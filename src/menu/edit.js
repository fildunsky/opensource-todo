"use strict";
const {t} = require("./../locale");

module.exports = {
  label: t("menu.edit.label"),
  submenu: [
    {
      type: "separator",
    }, {
      role: "undo",
      label: t("menu.edit.undo"),
    }, {
      role: "redo",
      label: t("menu.edit.redo"),
    }, {
      type: "separator",
    }, {
      role: "cut",
      label: t("menu.edit.cut"),
    }, {
      role: "copy",
      label: t("menu.edit.copy"),
    }, {
      role: "paste",
      label: t("menu.edit.paste"),
    }, {
      role: "pasteandmatchstyle",
      label: t("menu.edit.pasteAndMatchStyle"),
    }, {
      role: "delete",
      label: t("menu.edit.delete"),
    }, {
      role: "selectall",
      label: t("menu.edit.selectAll"),
    },
  ],
};
