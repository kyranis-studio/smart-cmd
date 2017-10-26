var _=require("lodash")
var term = require( 'terminal-kit' ).terminal ;
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
    term.red.error(`the type " ${typeName} " already exist \n`)
    term(`choose another name for this type \n`)
    term(`help : if you want to override it use overrideType function instead\n`)
    throw "type exist"
    return
  }
  types[typeName] = fn
}
exports.overrideType=(typeName, fn) =>{
  this.types[typeName] = fn
}