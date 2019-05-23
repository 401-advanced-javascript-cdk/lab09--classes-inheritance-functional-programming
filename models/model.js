'use strict';

class DataModel {

  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  put(_id, entry) {
    try {
      console.log(_id, {...entry})
      return this.schema.findOneAndUpdate({_id}, {...entry});
    }
    catch(e) {
      console.log(e)
    };
  }

  delete(_id) {
    return this.schema.findOneAndRemove({_id})
  }

}

module.exports = DataModel;