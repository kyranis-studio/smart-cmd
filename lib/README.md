Smart-cmd
---------

Smart cmd is a module to help development of command line interface (node cli) this an abstraction module 

 - Auto syntax checking
 - Auto error generation 
 - Auto control of argument
 
Quick start
-----------
Let's suppose you wanna make command line to copy a file to a destination

    npm install smart-cmd -S
    
----------

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	 $ARGS:[{name:”source”,required:true},{name:destination,required: true}],
	 $FN({source,destination}){
	    fs.copyFileSync(source,destination)
	  }
    })

 Run `node app.js myfile.txt /home/username`

**Documentation:******

 1. command.sytaxTree(object) // define the syntax of your commands
sytaxTree Object:
 - Command : nested object with the name of commands 
 - $ARGS:[object,...]:define the lists of arguments 
	 - name * : a String define the variable name 
	 - required: a Boolean define if he argument is required or not
	 - alias: an array of alias of the variable name prefixed by [-] exemple:[-o,-output]
	 - type:sting define the variable type exemple [string, number,...]
	 - label:string describe the variable shown in error message like if 	you have    variable userName the label should be user_name if omited it will be generated from the variable name
 - $FN:the function to execute
 - $FLAGS:array of flag send to the function 
 
  2.addType(callback)
  
  	const {command}=required(“smart-cmd”)
  		command.addType(function(value){
  		
  	})
  	
  3.overrideType(callback)
  4.definieError()
  5.terminal

**Examples without command:**

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	    $ARGS:[
		    {name:”source”,required:true},
		    {name:destination,required: true}
		  ],
	    $FN({source,destination}){
		    fs.copyFileSync(source,destination)
	    }
    })

Run node app.js myfile.txt /home/username

**Examples with command:**

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
    copy:{
	    $ARGS:[{name:”source”,required:true},{name:destination,required: true}],
	    $FN({source,destination}){
		  fs.copyFileSync(source,destination)
	  })
	}
})

Run node app.js copy myfile.txt /home/username

**Examples with multiple command:**

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
    copy:{
	    $ARGS:[
		    {name:”source”,required:true},
		    {name:destination,required: true}
	    ],
	    $FN({source,destination}){
	    fs.copyFileSync(source,destination)
	    })
    },
    Delete:{
	    $ARGS:[
		    {name:”file”,required:true},
		    {name:destination,required: true}
		],
		    $FN({file}){
			    fs.unlinkSync(source,destination)
		    })
		},
	 }
    })

You can run node app.js copy myfile.txt /home/username
Or can run node app.js detete /home/username/myfile.txt

**Examples with sub command**

    command.syntaxTree({
    Add:{
	    User:{
			    $ARGS:[{name:”userName”,label:”user_name”,required:true}]
			}
	    }
    })
    Command.run()
run node app.js add user Admin

