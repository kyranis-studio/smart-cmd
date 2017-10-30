"use strict";
var term = require( 'terminal-kit' ).terminal ;
var {command,errCode,terminal} = require( "./index")

const tree={
    $FN(){
      
    },
    $HELP(){
  
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
      },
      $HELP(){
  
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
        },
        $HELP(){
  
        }
      },
      table:{
        $ARGS:[{name:"tableName",required:true},{name:"scheam",type:"json"}],
        $FN({tableName,scheam}){
          console.log(tableName,scheam)
        },
        $HELP(){
  
        }
      },
    }
  }
 command.syntaxTree(tree)
 terminal.init({root:"NOJSDB"})
 
 terminal.run()