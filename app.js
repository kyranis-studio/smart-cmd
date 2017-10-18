var {command} = require("./index")
command.syntaxTree({
  $FN:function(){
    console.log("main whith arguments")
  },
  $HELP:function(){

  },
  $ARGS: [{type: "json",required: true,label: "user_name",name:"userName"}],
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
      $ARGS: [{type: "string",required: true,name:"tableName"},
              {type: "json",required: false,name:"scheam"}],
      $FN: function () {
        console.log(arguments)
        console.log(` nojsdb create table table_name [table_scheam] ok`)
      },
      $HELP:function(){

      }
    }
  }
})
command.addType("json", function (val) {
  try {
    JSON.parse(val)
    return true
  } catch (err) {
    return false
  }
})
command.overrideType("string", function (val) {
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

