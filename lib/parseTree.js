var term = require( 'terminal-kit' ).terminal ;
var _ = require("lodash")
let subTree = "Root"
var loopObj = (tree) => {
  for (var element in tree) {
    var subObj = tree[element]
    if (Object.isExtensible(subObj) && !element.startsWith("$")) {
      subTree = element
      loopObj(subObj)
    } else if (element.startsWith("$")) {
      var subObj = tree[element]
      var required= 0
      var maxArgs=subObj.length
      if (element == "$ARGS" && subObj.length) {
        var index = 0
        for(var args of subObj){
          index++
          if(!args.name){
            term.red.error(`the ${subTree} don't have a name attribuite at variable in index ${index}`)
            throw "missing name attribute"
          }
          args.required ? required++ : args.required =false
          args.type ? true : args.type = "any"
          args.label ? true : args.label = args.name.replace(/([A-Z])/,(upper)=>"_"+upper.toLowerCase())
          alias=false
          if(args.alias){
            for(var alias of args.alias){
              if(!alias.startsWith("-") && !alias.startsWith("--")){
                term.red.error(`alias [ ${alias} ] in ${subTree} has to be prefixed by [-] or [--]`)
                throw "wrong alias definition"
              }
              args[alias]=args.name
            }
            alias=true
          }
        }
        subObj.splice(0,0,{maxArgs,minArgs:required,alias,flags})
      }else if(element == "$FLAGS"){
        for(var flags of subObj){
          if(!flags.startsWith("-") && !flags.startsWith("--")){
            term.red.error(`flags [ ${flags} ] in ${subTree} has to be prefixed by [-] or [--]`)
            throw "wrong alias definition"
          }
        }
      }
    }
  }
}
exports.parseTree = (tree) => {
  loopObj(tree)
}