//import { error } from 'util';

var term = require( 'terminal-kit' ).terminal ;
var {types}=require("./types")
var _=require("lodash")
exports.parseArgs=function(parms,execPointer){
  var args=execPointer["$ARGS"]
  var flags=execPointer["$FLAGS"]
  var variables={}
  var errors=[]
  if(flags){
    variables.$FLAGS=[]
    for(flag of flags){
      if(parms.includes(flag)){
        variables.$FLAGS.push(flag)
        var index=parms.indexOf(flag)
        parms.splice(index,1)
      }
    }
  }
  if(args.length>0){
    var alias=args[0].alias||undefined
    var maxArgs=args[0].maxArgs
    var minArgs=args[0].minArgs
  }else{
    if(!_.isEmpty(parms)){
      errors.push({errorCode:6,errorMsg:"command does not expect argument"})
    }
  }
  if(alias){
    parmsLength=Math.floor(parms.length/2)
  }else{
    parmsLength=parms.length
  }
  if(parmsLength>maxArgs){
    errors.push({errorCode:4,errorMsg:"argument overload",expect:maxArgs,got:parmsLength})
  }else if(parmsLength<minArgs){
    errors.push({errorCode:3,errorMsg:"missing requirment",expect:minArgs,got:parmsLength})
  }
  if(alias){
    for(let i=0;i<parms.length;i=i+2){
      var exist=false
      for(arg of args){
        var varName=arg[parms[i]]
        var value =parms[i+1]
        if(varName){
          var type=arg.type
          try{
            types[type](value)? true:errors.push({errorCode:2,errorMsg:"wrong type",expect:type,got:typeof(value)})
          }catch(err){
            term.red.error(`the type [ ${type} ] is undefined add the type first`)
            throw "type undefined"
          }
          variables[varName]=value
          if(value==undefined){
            errors.push({errorCode:1,errorMsg:"missing input value",key:parms[i]})
          }
          if(varName){
            exist=true
            break
          }
        }
      }
      if(!exist){
        errors.push({errorCode:0,errorMsg:"undefined alias",key:parms[i]})
      }
    }
    return errors.length>0 ? errors : variables 
  }else{
    for(var i=1;i< args.length ;i++){
      var value = parms[i-1]=="[null]"? null:parms[i-1]
      var type=args[i].type
      if(args[i].required && !value){
        errors.push({errorCode:5,errorMsg:"required field missing",variable:args[i].label})
      }else if(types[type](value)){
        variables[args[i].name]=value
      }else{
        errors.push({errorCode:2,errorMsg:"wrong type",expect:type,got:typeof(value)})
      }
    }
    return errors.length>0 ? errors : variables
  }
}
