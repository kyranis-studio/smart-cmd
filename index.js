var log = require('terminal-kit').terminal;
var {parseArgs} = require("./lib/parseArgs")
var {parseKeyValue} = require("./lib/parseKeyValue")
var {types,addType,overrideType} = require("./lib/types")
var {errorHandler,getError} = require("./lib/error")
var {cout} = require("./lib/cout")
var {checkTree} = require("./lib/checkTree")
exports.command = {
  tree: {},
  syntaxTree(tree) {
    var checkedTree = checkTree(tree)
    if(checkedTree){
      this.tree = checkedTree
    }else{
      cout.error("abort execution\n")
      return
    }
  },
  run() {
    var error=getError()
    var arguments = process.argv.slice(2, process.argv.length)
    var args = Array.prototype.slice.call(arguments);
    var parms=[]
    parms=args.slice(0,args.length)
    var index=0
    var execPointer = this.tree
    for (i in args) {
       if(execPointer[args[i]]!= undefined){
        execPointer=execPointer[args[i]]
         parms.splice(0,1)
         index++
       }
    }
    if(execPointer["$ARGS"]){
      if(execPointer["$ARGS"].length){
        var result= parseArgs(parms,execPointer)
      }else{
        var result=parseKeyValue(args,execPointer)
      }
      if(result.length>0){
        error.argsCheck(result,cout)
      }else{
        try{
          execPointer.$FN(result)
        }catch(err){

        }
      }
    }else{
      cmd=args.slice(0,index)
      error.syntaxError(execPointer,cmd,cout)
    }
  }
}
exports.cout=cout
exports.types=types
exports.addType=addType
exports.overrideType=overrideType
exports.errorHandler=errorHandler
