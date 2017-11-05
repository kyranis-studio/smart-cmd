"use strict";
var term = require( 'terminal-kit' ).terminal ;
var {command,errCode,terminal} = require( "./index")
var fs = require("fs)

const tree={
    $ARGS:[],
    $FN(prams){
      console.log(prams)
    },
    bonjour:{
      $ARGS:[{name:"nom",type:"string",required:true,alias:["-u"]}],
      $FN({nom}){
        console.log(`Ahla ${nom}`)
      }
    },
    back:{
      $FN(){
        terminal.popPrompt()
      }
    },
    login:{
      $FLAGS:["--help"],
      $ARGS:[{name:"userName",alias:["-u"]}],
      $FN({userName,$FLAGS}){
        console.log(userName,$FLAGS)
      }
    },
    selectDB:{
      $ARGS:[{name:"dbName"}],
      $FN({dbName}){
        terminal.pushPrompt(`[db:${dbName}]`)
      },
    },
    create:{
      su:{
        $ARGS:[{name:"userName",required:true}],
        $FN({userName}){
          console.log(userName)
        }
      },
      table:{
        $ARGS:[{name:"tableName",required:true},{name:"scheam",type:"json"}],
        $FN({tableName,scheam}){
          console.log(tableName,scheam)
        }
      },
    }
  }
 command.syntaxTree(tree) 
 //terminal.init({root:"NOJSDB"})
 
 command.run()
