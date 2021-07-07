"use strict";

const CatMainUseCaseError = require("./cat-main-use-case-error.js");
const CAT_ERROR_PREFIX = `${CatMainUseCaseError.ERROR_PREFIX}cat/`;

const Create = {
  UC_CODE: `${CAT_ERROR_PREFIX}create/`,
  
  CatInstanceDoesNotExist: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}catInstanceDoesNotExist`;
      this.message = "CatInstance does not exist.";
    }
  },

  InvalidDtoIn: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
  CatDaoCreateFailed: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}catDaoCreateFailed`;
      this.message = "Create cat by cat DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${CAT_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn in UPDATE is not valid.";
    }
  },
  CatDoesNotExist: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}testCaseUpdateDaoFailed`;
      this.message = "Cat does not exist";
    }
  },
  CatUpdateDaoFailed: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}testCaseUpdateDaoFailed`;
      this.message = "Update test case by testCase DAO update failed.";
    }
  }
};

const Get = {
  UC_CODE: `${CAT_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  catDoesNotExist: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}catDoesNotExist`;
      this.message = "Cat does not exist.";
    }
  },
  
  catInstanceDoesNotExist: class extends CatMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}catInstanceDoesNotExist`;
      this.message = "CatInstance does not exist.";
    }
  },

};

module.exports = {
  Get,
  Update,
  Create
};
