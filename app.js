var {command,cout,addType,overrideType} = require("./index")
command.syntaxTree({
  $FN:function(){
    console.log("main whith arguments")
  },
  $HELP:function(){
  },
  $ARGS: [{type: "json",required: true,label: "user_name",name:"help"}],
  login: {
    $ARGS: [{type: "string",required: true,label: "user_name",name:"userName"}],
    $FN: function () {
      console.log("login exec")
    },
    $HELP: function () {
      
    }
  },
  create: {
    su: { // cmd : nojsdb create su super_user_name
      $ARGS: [{type: "string",required: true,label: "super_user_name",name:"su"}],
      $FN: function () {
        console.log(" nojsdb create su super_user_name ok")
      },
      $HELP: function () {

      }
    },
    table: { // cmd : nojsdb create table table_name [table_scheam] 
      $ARGS: [{required: true,name:"tableName"},
              {required: true,name:"scheam",type:"json"}],
      $FN: function ({tableName,scheam}) {
        console.log(tableName,scheam)
        console.log(` nojsdb create table ${tableName} [table_scheam] ok`)
      },
      $HELP:function(){

      }
    }
  },
  convert:{//maped variables
    $ARGS:[{name:"HelpMe"}]
  }
})
addType("json", function (val) {
  try {
    JSON.parse(val)
    return true
  } catch (err) {
    return false
  }
})
overrideType("string", function (val) {
  if(val==undefined )
    return false
  try {   
    eval("var " + val)
    return true
  } catch (err) {
    return false
  }
})

command.run()

