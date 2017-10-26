"use strict";
var term = require( 'terminal-kit' ).terminal ;
var {command,errCode} = require( "./index")
command.syntaxTree({
  $ARGS:[{name:"input",required:true,alias:["--i","-input"],type:"any"},
  {name:"output",alias:["-o","-out"]}],
  $FN({input}){
    console.log(input)
  },
  $HELP(){

  },
  login:{
    $ARGS:[{name:"admin"},{name:"userName",required:true}],
    $FN({admin,userName}){
      console.log(admin,userName)
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