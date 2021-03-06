"use strict";
var {parseTree}=require("./lib/parseTree")
var {parseArgs}=require("./lib/parseArgs")
var {errors}=require("./lib/errors")
var {addType}=require("./lib/types")
var {terminal}=require("./lib/terminal")
var {setStyle,log}=require("./lib/terminal-style")
exports.terminal=terminal
exports.setStyle=setStyle
exports.errCode={
  UNDEFINED_ALIAS:0,
  MISSING_INPUT:1,
  WRONG_TYPE:2,
  MISSING_REQUIREMENT:3,
  ARGUMENT_OVERLOAD:4,
  REQUIRED_FIELD:5,
  UNEXPECTED_ARGUMENTS:6
}
exports.command = {
  tree: {},
  errors,
  terminal,
  addType,
  syntaxTree(tree) {
    this.tree = tree
    parseTree(this.tree)
  },
  run() {
    var args=[]
    if(!arguments[0]){
      args = Array.prototype.slice.call(process.argv.slice(2, process.argv.length));
    }else{
      args=arguments[0]
    }
    var parms=[]
    var cmds=[]
    parms=args.slice(0,args.length)
    var execPointer = this.tree
    for(var arg of args){
      if(execPointer[arg]){
        execPointer=execPointer[arg]
        cmds.push(arg)
        parms.splice(0,1)
      }else{
        if(execPointer["$ARGS"]){
          break
        }
      }
    }
    if(execPointer.$ARGS){
      var result = parseArgs(parms,execPointer)
    }else if(!execPointer.$FN){
      log.error("sub-command error :")
      log.error(`wrong sub-command [ ${cmds[cmds.length-1]} ]  expect :`)
      Object.keys(execPointer).forEach(function(subCmd){
        log.success(`  ${subCmd}`)
      })
      
    }else{
      execPointer.$FN(Array.from(parms))
    }
    if(result && result.length>0){
      errors.errorsHandler(result)
    }else{
      if(execPointer.$FN){
        if(result!==undefined){
          execPointer.$FN(result)
        }
      }else{
        if(cmds.length>0){
          var command=cmds.join(" ") 
        }else{
          var command="Root"
        }
        log.error("error : ")
        console.log(`[ ${command} ] has no function to run`)
      }
    }
  }
}
