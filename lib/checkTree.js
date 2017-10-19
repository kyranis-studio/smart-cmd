var _=require("lodash")
var {cout} = require("./cout")
let root = "Tree Syntax Root"
var loop = (obj)=> {
  var treeError = false
  var keys=Object.keys(obj)
  for(var i in keys) {
    if(!keys[i].startsWith("$")){
      root=keys[i]
    }
    var subObj=obj[keys[i]]
    if(keys[i]=="$ARGS"){
      var args=obj[keys[i]]
      for(i in args){
        if(args[i].name==undefined){
          cout.error(`invalid tree syntax in [ ${root} ]\n`).
          log("argument object has to have a [ name ] attribute \n").
          log("this name is used for variable name \n")
          treeError=true
        }
      }
    }
    if(_.isPlainObject(subObj)){
      loop(subObj)
    }      
  }
  return treeError
};
exports.checkTree=(tree)=>{
  return loop(tree)
}