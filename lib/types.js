var _=require("lodash")
var {log}=require("./terminal-style")

var types={
  number(val){
    return _.isNumber(val)
  },
  json(val){
    try{
      JSON.parse(val)
      return true
    }catch(err){
      return false
    }
  },
  string(val){
    return _.isString(val)
  },
  any(val){
    return true
  }
}
exports.types=types
exports.addType=(typeName, fn)=> {
  if (this.types[typeName]) {
    log.error(`the type " ${typeName} " already exist `)
    console.log(`choose another name for this type `)
    console.log(`help : if you want to override it use overrideType function instead`)
    throw "type exist"
    return
  }
  types[typeName] = fn
}
exports.overrideType=(typeName, fn) =>{
  this.types[typeName] = fn
}