"use strict";
var {command,errCode,terminal,setStyle} = require( "./index")
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
      $ARGS:[{name:"dbName",required:true,type:"string"}],
      $FN({dbName}){        
        terminal.pushPrompt(`[db:${dbName}]`,["magenta"])
        var dollar=setStyle("$",['magenta'])
        var root =setStyle("NOJSDB",["blue"])
        terminal.run({root:dollar+root})
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
  var dollar = setStyle("$",['magenta'])
  var root = setStyle("NOJSDB",["blue"])

  // terminal.run({root:dollar+root,styles:['bold']},function(){
  //   console.log(setStyle("Quit",["red"]))
  // })
  command.run()
