var term = require( 'terminal-kit' ).terminal ;

function shell(){
  term.bold( 'NOJSDB[mydb]:Users >' ) ;
  term.inputField(function( error , input ) {
      term("\n"+input+"\n")
      if(input=="exit"){
        process.exit() ;
      }
      shell()
    }
  ) ;
}
shell()