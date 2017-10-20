var _=require("lodash")
var {cout}= require("./cout")
var types={
  string(val){
    return _.isString(val)
  },
  number(val){
    return _.isNumber(val)
  },
  any(val){
    return true
  }
}
exports.types=types
exports.addType=(typeName, fn)=> {
  if (this.types[typeName]) {
    cout.warning(`the type " ${typeName} " already exist \n`).
    log(`choose another name for this type \n`).
    log(`help : if you want to override it use overrideType function instead\n`)
    throw "type exist"
    return
  }
  types[typeName] = fn
}
exports.overrideType=(typeName, fn) =>{
  this.types[typeName] = fn
}