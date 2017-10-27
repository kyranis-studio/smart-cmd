"use strict";
var term = require( 'terminal-kit' ).terminal ;
var {command,errCode} = require( "./index")
command.syntaxTree({

  $FN(){
    console.log("ok")
  },
  $HELP(){

  },
  login:{
    $FLAGS:["--help"],
    $ARGS:[{name:"userName",alias:["-u"]}],
    $FN({userName,$FLAGS}){
      console.log(userName,$FLAGS)
    },
    $HELP(){

    }
  },
  create:{
    su:{
      $ARGS:[{name:"userName",required:true}],
      $FN({userName}){
        console.log(userName)
      },
      $HELP(){

      }
    },
    table:{
      $ARGS:[{name:"tableName",required:true},{name:"scheam",type:"json"}],
      $FN(){

      },
      $HELP(){

      }
    },
  }
})
command.run()