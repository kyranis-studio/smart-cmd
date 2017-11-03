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
    command.run()

 Run `node app.js myfile.txt /home/username`

**Documentation:**

 1. command.sytaxTree(object) // define the syntax of your commands*
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
 
  2. command.addType(type_name,callback) : return a boolean
  
	 - type_name : string
	 - calback function
	 
 ------
 
  	const {command}=required(“smart-cmd”)
  	command.addType("json",function(value){
	 	 if(JSON.stringify(value)){
	  		return true
	  	}else{
	  		return false
	  	}
  	})
 	 
  3. command.overrideType(callback) : return a boolean
  override pre existed type
	 - type_name : string
	 - calback function
  -----
	const {command}=required(“smart-cmd”)
	command.overrideType("json",function(value){
		if(JSON.stringify(value)){
			return true
		}else{
			return false
		}
	})
	
  4. command.overrideError(errorCode,callback)
	  - errorCode: a number
	  - callback
	  
errCode:
UNDEFINED_ALIAS=0
MISSING_INPUT=1
WRONG_TYPE=2
MISSING_REQUIREMENT=3
ARGUMENT_OVERLOAD=4
REQUIRED_FIELD=5
UNEXPECTED_ARGUMENTS=6
	
  -------
  	const {command}=required(“smart-cmd”)
	command.overrideError(MISSING_INPUT,function(error){
		console.log("missing input")
	})
  5. terminal
  terminal.init(prompt)
  terminal.setPrompt()
  terminal.getPrompt()
  terminal.pushPrompt()
  terminal.popPrompt()
  terminal.run()

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
    command.run()

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
	command.run()

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
    command.run()

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
    command.run()
run node app.js add user Admin

