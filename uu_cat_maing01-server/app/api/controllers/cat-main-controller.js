"use strict";
const CatMainAbl = require("../../abl/cat-main-abl.js");

class CatMainController {
  init(ucEnv) {
    return CatMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new CatMainController();
