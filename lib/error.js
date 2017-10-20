var error={
  syntaxError(execPointer,cmd,cout,) {
    suggestions=Object.keys(execPointer).join(" ]\n   [ ")
    commands=cmd.join(" ")
    cout.error("syntax error : \n").
    log(`[ ${commands} ] expect one of this sub-commands:\n`).
    log(`   [ ${suggestions} ]\n`)
  },
  argsCheck(err,cout){
    for(let i in err){
      if(err[i].error=="required"){
        cout.error("required arguments:\n").
        log(`expect ${err[i].expect} and got ${err[i].got}\n`)
      }
      if(err[i].error=="type"){
        cout.error("wrong type:\n").
        log(`the variable [ ${err[i].variable} ] has the wrong type expect [ ${err[i].expect} ] got [ ${err[i].got} ]\n`)
      }
      if(err[i].error=="maxArgs"){
        cout.error("too much argument:\n").
        log(`expect ${err[i].expect} and got ${err[i].got}\n`)
      }
    }
  }
}
exports.errorHandler=(fnName, callback) =>{
  error[fnName] = callback
}
exports.getError = ()=>{ return error}