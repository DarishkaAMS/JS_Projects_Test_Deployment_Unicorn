"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
const { DbConnection } = require("uu_appg01_datastore");

class CatMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }

  async create(uuObject) {
    if (uuObject.categoryList) {
      uuObject.categoryList = uuObject.categoryList.map(categoryId => new ObjectId(categoryId));
    }
    return await super.insertOne(uuObject);
  }

  async update(uuObject) {
    const {id, awid} =uuObject
    return super.findOneAndUpdate({ awid, id },uuObject );
  }

  async get(awid, id) {
    return await super.findOne({ awid, _id: id });
  }
  
}

module.exports = CatMongo;
