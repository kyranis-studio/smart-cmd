var _=require("lodash")
var {cout} = require("./cout")
let root = "Tree Syntax Root"
var generateLabel=(string)=>{
  var chars=[]
  var label=""
  for(let i in string){
    if(string[i]==string[i].toUpperCase()){
      chars.push(string[i])
    }
  }
  for(let i in chars){
    char=chars[i].toString()
    label=string.replace(char,`_${char.toLowerCase()}`)
  }
  if(chars.length==0){
    return string
  }else{
    return label
  }
}
var loop = (obj)=> {
  var treeError = false
  var keys=Object.keys(obj)
  for(var i in keys) {
    if(!keys[i].startsWith("$")){
      root=keys[i]
    }
    var subObj=obj[keys[i]]
    if(keys[i]=="$ARGS"){
      if(_.isArray(obj[keys[i]])){
          var args=obj[keys[i]]
        for(i in args){
          if(_.isEmpty(args[i].name)){
            cout.error(`invalid tree syntax in [ ${root} ]\n`).
            log("argument object has to have a [ name ] attribute \n").
            log("this name is used for variable name \n")
            treeError=true
          }
          _.isEmpty(args[i].require) ? args[i].require=false : args[i].require
          _.isEmpty(args[i].type) ? args[i].type="any" : args[i].type
          _.isEmpty(args[i].label) ? args[i].label=generateLabel(args[i].name) : args[i].label
        }
      }else{
        
      }
    }
    if(_.isPlainObject(subObj)){
      loop(subObj)
    }      
  }
  if(treeError ){
    throw new Error("non valid syntax tree")
  }
  return obj
};
exports.checkTree=(tree)=>{
  return loop(tree)
}