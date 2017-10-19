var log = require('terminal-kit').terminal;
var {parseArgs} = require("./lib/parseArgs")
var {types} = require("./lib/types")
var {error} = require("./lib/error")
var {cout} = require("./lib/cout")
var {checkTree} = require("./lib/checkTree")



exports.command = {
  tree: {},
  error,
  cout,
  types,
  errorHandler(fnName, callback) {
    this.error[fnName] = callback.bind(error)
  },
  syntaxTree(tree) {
    this.tree = tree
  },
  addType(typeName, fn) {
    if (this.types[typeName]) {
      cout.warning(`the type " ${typeName} " already exist \n`).
      error(`choose another name for this type \n`).
      info(`help : if you want to override it use overrideType function instead\n`)
      throw "type exist"
      return
    }
    this.types[typeName] = fn
  },
  overrideType(typeName, fn) {
    this.types[typeName] = fn
  },
  run() {
    var treeError = checkTree(this.tree)
    if(treeError){
      cout.error("abort execution\n")
      return
    }
    var arguments = process.argv.slice(2, process.argv.length)
    var args = Array.prototype.slice.call(arguments);
    var parms=[]
    parms=args.slice(0,args.length)
    var i=0
    var execPointer = this.tree
    for (i in args) {
       if(execPointer[args[i]]!= undefined){
        execPointer=execPointer[args[i]]
         parms.splice(0,1)
       }
    }
    if(execPointer["$ARGS"]){
      var result= parseArgs(parms,execPointer)
      if(result.length>0){
        console.log(result)
      }else{
        execPointer.$FN(result)
      }
    }else{
      console.log("syntax error")
    }
  }
}