var term = require( 'terminal-kit' ).terminal ;
var defsErrors=[
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} [ ${err.key} ]\n`)
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} [ ${err.key} ]\n`)
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} [ ${err.variable} ]\n`) 
  },
  function(err){
    term.red(`error code : ${err.errorCode}\n`)
    term(`${err.errorMsg} \n`) 
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