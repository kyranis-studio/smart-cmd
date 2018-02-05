var {log}=require("./terminal-style")
var defsErrors=[
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} [ ${err.key} ]`)
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} [ ${err.key} ]`)
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]`)  
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]`)  
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]`)  
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} [ ${err.variable} ]`) 
  },
  function(err){
    log.error(`error code : ${err.errorCode}`)
    console.log(`${err.errorMsg} `) 
  }
]
var errorsStack=[]
exports.errors = {
  errorsHandler(errors){
    errorsStack=errors
    for(err of errors){
      defsErrors[err.errorCode](err)
    }
  },
  overrideError(errCode,callback){
    defsErrors[errCode]=callback
  }
}