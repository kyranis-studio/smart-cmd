Smart-cmd
---------

Smart cmd is a module to help development of command line interface (node cli) this an abstraction module 

 - Auto syntax checking
 - Auto error generation 
 - Auto control of argument (type ,required ...)
 
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
------
 	run node app.js myfile.txt /home/username

**Documentation:**

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
	 - $FLAGS:array of flag send to the function exemple : [-force,-f]
 
  2. command.addType(type_name,callback) : return a boolean
  
	 - type_name : string
	 - calback function
	 
 ------
 
  	const {command}=required(“smart-cmd”)
  	command.addType("json",function(value){
	try{
	      JSON.parse(val)
	      return true
	    }catch(err){
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
	  
errCode:\
UNDEFINED_ALIAS=0\
MISSING_INPUT=1\
WRONG_TYPE=2\
MISSING_REQUIREMENT=3\
ARGUMENT_OVERLOAD=4\
REQUIRED_FIELD=5\
UNEXPECTED_ARGUMENTS=6
	
  -------
  	const {command}=required(“smart-cmd”)
	command.overrideError(MISSING_INPUT,function(error){
		console.log("missing input")
	})
  5. terminal

  terminal.init(prompt) init the prompt\
  
  - prompt object:
  	- prefix
  	- root
  	- postfix
  -------
	  const {terminal}=required(“smart-cmd”)
	  terminal.init({prefix:"$",root:"myShell",postfix:">"})
	  terminal.run()
	  
run node app.js you get an node interface with a prompt

	$myShell>

ctrl+c to quit

  terminal.pushPrompt()\
  ------
	const {terminal}=required(“smart-cmd”)
	terminal.init({prefix:"$",root:"myShell",postfix:">"})
	terminal.pushPrompt("/hello")
	terminal.setPrompt()
	terminal.run()
  
  run node app.js
  
  	$myShell/hello>
	
  terminal.popPrompt()\
  
  	const {terminal}=required(“smart-cmd”)
	terminal.init({prefix:"$",root:"myShell",postfix:">"})
	terminal.pushPrompt("/hello")
	terminal.popPrompt()
	terminal.setPrompt()
	terminal.run()

  run node app.js
  
  	$myShell>
  	
  terminal.setPrompt() set or update the prompt\
  terminal.getPrompt() return the prompt as an array\
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
------
	run node app.js copy myfile.txt /home/username

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

You can run node app.js copy myfile.txt /home/username\
or can run node app.js detete /home/username/myfile.txt

**Examples with sub command**

    command.syntaxTree({
    Add:{
	    User:{
			    $ARGS:[{name:”userName”,label:”user_name”,required:true}]
			    $FN({userName}){
			    	console.log(`${userName} successfully added`)
			    }
			}
	    }
    })
    command.run()
run node app.js add user Admin

	//console.log()
	Admin successfully added



**Examples with no $ARGS attribute**\
when you don't define the $ARGS attribute you can pass any number of arguments to your function

	const {command}=required(“smart-cmd”)

	command.syntaxTree({
		$FN(args){
			console.log(args)
		}
	})
	command.run()

run node app.js hello world !

	//console.log()
	['hello','world','!']

**Examples with $ARGS attribute as empty array** \
if you se $ARGS as an empty array you force your command to show an error when you pass arguments

	const {command}=required(“smart-cmd”)

	command.syntaxTree({
		$ARGS:[],
		$FN(args){
			console.log(args)
		}
	})
	command.run()

run node app.js hello world !

	error :
	command does not expect argument

**Examples with $ARGS multiples arguments**\
when you pass multiple arguments the order matter you cannot change the order of arguments

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	 $ARGS:[{name:”source”,required:true},{name:destination,required: true}],
	 $FN({source,destination}){
	    fs.copyFileSync(source,destination)
	  }
    })
    command.run()
   -----
    run node app.js myfile.txt /home/username

**Examples with required arguments**\
if you forget to pass an error message is shown see previous example

**Examples with optional arguments**\
if required is omitted or equal to false the arguments is optional

**Examples pass null to optional arguments**\

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	convert:{
		$ARGS:[{name:"input",required:true},{name:"format"},{name:"output",required:true}],
		$FN({convert,format,output}){
			//your code to conver video ....
		}
	}
    })
    command.run()
-----
	run node app convert movie.avi [null] movie.mp4

**Examples with alias**\
you can rewrite the previous example with alias .alias is more flexible you can pass arguments in the order you want it like key value objects

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	convert:{
		$ARGS:[{name:"input",required:true,alias:[-i,-input]},{name:"format",alias:[-format,-f]},{name:"output",required:true,[-out,-o]}],
		$FN({convert,format,output}){
			//your code to conver video ....
		}
	}
    })
    command.run()
-----
	run node app convert -out movie.mp4 -input movie.avi 
or

-----
	run node app convert -o movie.mp4 -i movie.avi 
	

**Examples with $FLAGS**\
flags is an array you can pass to your function . you can use it to change the behaviour of your function like force some command

    const {command}=required(“smart-cmd”)
    const fs=required(“fs”)
    
    command.syntaxTree({
	rmdir:{
		$FLAGS:["-f",--force],
		$ARGS:[{name:"folder"}],
		$FN({folder,$FLAGS}){
			console.log(folder,$FLAGS)
		}
	}
    })
    command.run()
------
	run node app.js rmdir myfolder -f
----
	//console.log()
	myfolder ['-f']



