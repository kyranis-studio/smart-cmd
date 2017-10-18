var _=require("lodash")
exports.types={
  string(val){
    return _.isString(val)
  },
  number(val){
    return _.isNumber(val)
  }
}