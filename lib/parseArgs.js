var {types}=require("./types")
var {cout}=require("./cout")
exports.parseArgs=function(args,execPointer){
  var argDesc=execPointer["$ARGS"]
  var cmdArgs=args.length
  var maxArgs=argDesc.length
  var requiredArgs = 0
  var errors=[]
  var variables={}
  argDesc.forEach((arg) =>{
    arg.required == true ? requiredArgs++ : true
  });
  cmdArgs<requiredArgs ? errors.push({error:"required",expect:requiredArgs,got:cmdArgs}):true
  cmdArgs>maxArgs ? errors.push({error:"maxArgs",expect:maxArgs,got:cmdArgs}):true
  for (i in argDesc){
    var type=argDesc[i].type
    var label=argDesc[i].label ? argDesc[i].label :argDesc[i].name
    var name = argDesc[i].name
    var required = argDesc[i].required
    var argValue =args[i]    
    if(args[i]||(argDesc[i].required && !args[i])){
      if(argValue){
        try{
          !types[type](argValue) ? errors.push({error:"type",variable:label,expect:type,got:argValue+"",required}) : variables[name]=argValue
        }catch(err){
          cout.error(`[ ${type} ] type is not defined\n`).
          log("use addType function to add your custom type\n")
          throw new Error("undefined type")
        }
      }else{
        errors.push({error:"type",variable:label,expect:type,got:argValue+"",required})
      }
    }
  }
  return  errors.length > 0 ? errors:variables
}