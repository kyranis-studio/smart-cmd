

Smart-cmd
---------

Smart cmd is a module to help development of command line interface (node cli) this an abstraction module 

 1. Auto syntax checking
 2. Auto error generation 
 3. Auto control of argument (type ,required ...)
 
Quick start
-----------
Let's suppose you wanna make command line to copy a file to a destination

    npm install smart-cmd -S
    
----------

	const {command}=require("smart-cmd")
	const fs=require("fs")

	command.syntaxTree({
	 $ARGS:[{name:"source",required:true},{name:"destination",required: true}],
	 $FN({source,destination}){
	    fs.copyFileSync(source,destination)
	  }
	})
	command.run()
------
 	run node app.js myfile.txt /home/username
# Index
 1. [Syntax Tree](#syntax-tree)
 2. [Add Type](#add-type)
 3. [Override Type](#override-type)
 4. [Override Error](#override-error)
 5. [Terminal](#terminal)
 6. [Style Log](#style-log)
 7. [Exemples](#exemples)

**Documentation:**

### Syntax Tree

 1. command.sytaxTree(object) // define the syntax of your commands
sytaxTree Object:
	 - Command : nested object with the name of commands 
	 - $ARGS:[object,...]:define the lists of arguments 
		 - name * : a String define the variable name 
		 - required: a Boolean define if he argument is required or not
		 - alias: an array of alias of the variable name prefixed by [--] exemple:[--o,--output]
		 - type:sting define the variable type exemple [string, number,...]
		 - label:string describe the variable shown in error message like if 	you have    variable userName the label should be user_name if omited it will be generated from the variable name
	 - $FN:the function to execute
	 - $FLAGS:array of flag send to the function the variable name prefixed by [-] exemple : [-force,-f]
 ### Add Type

  2. command.addType(type_name,callback) : return a boolean
  
	 - type_name : string
	 - calback function

----
 
	const { command } = require("smart-cmd")
	command.addType("json", function (value) {
	  try {
	    JSON.parse(val)
	    return true
	  } catch (err) {
	    return false
	  }
	})
 	 
### Override Type

  3. command.overrideType(callback) : return a boolean
  override pre existed type
	 - type_name : string
	 - calback function
  -----
	const { command } = require("smart-cmd")
	command.overrideType("json", function (value) {
	  if (JSON.stringify(value)) {
	    return true
	  } else {
	    return false
	  }
	})
	
### Override Error

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
  	const {command,errCode}=require("smart-cmd")
	command.overrideError(errCode.MISSING_INPUT,function(error){
		console.log("missing input")
	})

### Terminal

  5. terminal
    
  -------
	  const {terminal}=require("smart-cmd")
	  terminal.run({prefix:"$",root:"myShell",postfix:">",styles:['blue']})
	  
run node app.js you get an node interface with a prompt

	$myShell>

ctrl+c to quit

  **terminal.pushPrompt()**
  
	const {terminal}=require("smart-cmd")
	terminal.pushPrompt("/hello")
	terminal.run({prefix:"$",root:"myShell",postfix:">",styles:['blue']})
  
  run node app.js
  
  	$myShell/hello>
  **terminal.prompt (object)** you can directly change the prompt
  
 - prefix   exemple : terminal.prompt.prefix="$"
 - root      exemple : terminal.prompt.prefix="myshell"
 - postfix  exemple : terminal.prompt.prefix=">"
 - styles  exemple : terminal.prompt.styles=['blue','bold'] //this use [chalk](https://github.com/chalk/chalk) to style the prompt see [style](https://github.com/chalk/chalk#styles) section you can use color bgcolor an modifier function
  	
  **terminal.clearPrompt()** clear the pushed elements in the prompt\
  **terminal.setPrompt(array)**\
  **terminal.popPrompt()**\
  
  	const {terminal}=require("smart-cmd")
	terminal.pushPrompt("/hello")
	terminal.popPrompt()

	terminal.run({prefix:"$",root:"myShell",postfix:">",styles:['blue']})

  run node app.js
  
  	$myShell>
  	

  **terminal.getPrompt()** return the prompt as an array\
  **terminal.run(prompt,callback)** 
  
 - prompt object:
  	- prefix
  	- root
  	- postfix
  	- styles
 - callback a function called after closing the terminal this may be to show a message a do some extra work
  
  exemple :
  
	    const {terminal,setStyle}=require("smart-cmd")
		terminal.pushPrompt("/hello")
		terminal.popPrompt()
		terminal.run({prefix:"$",root:"myShell",postfix:">",styles:['blue']},function(){
			console.log(setStyle("Quit",["red"]))
		})// this callback prin Quit with red color when closing the terminal
  	
   **terminal.exit()** 
   
### Style Log

   6. setStyle(message,styles) return the styled string
 - message : string
 - style:array of string //see [chalk style](https://github.com/chalk/chalk#styles)

   set style to console.log output this function use  [chalk](https://github.com/chalk/chalk) to style the output see [style](https://github.com/chalk/chalk#styles) section you can use color bgcolor an modifier function
   
		   const {setStyle}=require("smart-cmd")
           var styledText = setStyle("hello world",['green','bold'])
		   console.log(styledText)

### Exemples

**Examples without command:**

    const {command}=require("smart-cmd")
    const fs=required("fs")
    
    command.syntaxTree({
	    $ARGS:[
		    {name:”source”,required:true},
		    {name:"destination",required: true}
		  ],
	    $FN({source,destination}){
		    fs.copyFileSync(source,destination)
	    }
    })
    command.run()

Run node app.js myfile.txt /home/username

**Examples with command:**

    const {command}=require("smart-cmd")
    const fs=require("fs")
    
    command.syntaxTree({
	    copy:{
		    $ARGS:[{name:”source”,required:true},{name:"destination",required: true}],
		    $FN({source,destination}){
			  fs.copyFileSync(source,destination)
		  })
		}
	})
	command.run()
------
	run node app.js copy myfile.txt /home/username

**Examples with multiple command:**

	const { command } = require("smart-cmd")
	const fs = require("fs")

	command.syntaxTree({
	  copy: {
	    $ARGS: [
	      { name: "source", required: true },
	      { name: "destination", required: true }
	    ],
	    $FN({ source, destination }) {
	      fs.copyFileSync(source, destination)
	    }
	  },
	  delete: {
	    $ARGS: [
	      { name: "file", required: true }
	    ],
	    $FN({ file }) {
	      fs.unlinkSync(file)
	    }
	  }
	})
	command.run()

You can run node app.js copy myfile.txt /home/username\
or can run node app.js detete /home/username/myfile.txt

**Examples with sub command**

	const { command } = require("smart-cmd")
	command.syntaxTree({
	  add: {
	    user: {
	      $ARGS: [{ name: "userName", label: "user_name", required: true }],
	      $FN({ userName }) {
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

	const {command}=require("smart-cmd")

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

	const {command}=require("smart-cmd")

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

	const {command}=require("smart-cmd")
	const fs=required("fs")

	command.syntaxTree({
	 $ARGS:[{name:"source",required:true},{name:"destination",required: true}],
	 $FN({source,destination}){
	    fs.copyFileSync(source,destination)
	  }
	})
	command.run()
   -----
    run node app.js myfile.txt copy.txt

**Examples with required arguments**\
if you forget to pass the required argument an error message is shown see previous example

**Examples with optional arguments**\
if required is omitted or equal to false the arguments is optional

**Examples pass null to optional arguments**

	const {command}=require("smart-cmd")

	command.syntaxTree({
	convert:{
	    $ARGS:[{name:"input",required:true},{name:"format"},{name:"output",required:true}],
	    $FN({input,format,output}){
	      console.log({input,format,output})
		//your code to conver video ....
	    }
	}
	})
	command.run()
-----
	run node app convert movie.avi [null] movie.mp4

**Examples with alias**\
you can rewrite the previous example with alias .alias is more flexible you can pass arguments in the order you want it like key value objects

	const { command } = require("smart-cmd")

	command.syntaxTree({
	  convert: {
	    $ARGS: [{ name: "input", required: true, alias: ["--i", "--input"] }, { name: "format", alias: ["--format", "--f"] }, { name: "output", required: true, alias: ["--out", "--o"] }],
	    $FN({ input, format, output }) {
	      console.log(input, format, output)
	      //your code to conver video ....
	    }
	  }
	})
	command.run()
-----
	run node app convert --out movie.mp4 --input movie.avi 
or

-----
	run node app convert --o movie.mp4 --i movie.avi 
	

**Examples with $FLAGS**\
flags is an array you can pass to your function . you can use it to change the behaviour of your function like force some command

const { command } = require("smart-cmd")

	command.syntaxTree({
	  rmdir: {
	    $FLAGS: ["-f", "-force"],
	    $ARGS: [{ name: "folder" }],
	    $FN({ folder, $FLAGS }) {
	      console.log(folder, $FLAGS)
	    }
	  }
	})
	command.run()
------
	run node app.js rmdir myfolder -f
----
	//console.log()
	myfolder ['-f']
