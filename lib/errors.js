var term = require( 'terminal-kit' ).terminal ;
var defsErrors=[
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} [ ${err.key} ]\n`)
  },
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} [ ${err.key} ]\n`)
  },
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} expect [ ${err.expect} ] got [ ${err.got} ]\n`)  
  },
  function(err){
    term.red("error : ")
    term(`${err.errorMsg} [ ${err.variable} ]\n`) 
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
  definieError(errCode,callback){
    defsErrors[errCode]=callback
  }
}