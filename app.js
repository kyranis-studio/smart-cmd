"use strict";
var term = require( 'terminal-kit' ).terminal ;
var {command,errCode,terminal} = require( "./index")
var fs = require("fs")

const tree={
    $ARGS:[],
    $FN(prams){
      terminal.run({root:"my"})
    },
    back:{
      $FN(){
        terminal.popPrompt()
      }
    },
    exit:{
      $FN(){
        terminal.exit()
      }
    },
    login:{
      $FLAGS:["--help"],
      $ARGS:[{name:"userName",alias:["-u"]}],
      $FN({userName,$FLAGS}){
        console.log(userName,$FLAGS)
      }
    },
    clearPrompt:{
      $FN(){
        terminal.clearPrompt()
      }
    },
    selectDB:{
      $ARGS:[{name:"dbName"}],
      $FN({dbName}){        
        terminal.pushPrompt(`[db:${dbName}]`)
        terminal.run({root:"NOJSDB"})
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
 command.run()
