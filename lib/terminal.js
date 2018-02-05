const readline = require('readline');
const command = require('../index');
const {setStyle} = require('./terminal-style')

var rl
var setPrompt = function () {
  $this = exports.terminal
  var prefix = $this.prompt.prefix
  var root = $this.prompt.root
  var postfix = $this.prompt.postfix
  var color = $this.prompt.color
  var prompt = $this.promptArray.join("")
  rl.setPrompt(setStyle(`${prefix}${root}${prompt}${postfix}`,exports.terminal.prompt.styles))
}
exports.terminal = {
  prompt: {
    prefix: "",
    root: "",
    postfix: ">",
    styles:["blue"]
  },
  promptArray: [],
  setPrompt(array){
    this.promptArray=array
    setPrompt()
  },
  getPrompt() {
    return this.promptArray
  },
  clearPrompt(){
    this.promptArray=[]
    setPrompt()
  },
  pushPrompt(prompt,styles) {
    this.promptArray.push(setStyle(prompt,styles))
    try {
      setPrompt()
    } catch (err) {

    }
  },
  popPrompt() {
    this.promptArray.pop()
    try {
      setPrompt()
    } catch (err) {

    }
  },
  run(prompt,callback) {
    if (prompt) {
      prompt.prefix ? this.prompt.prefix = prompt.prefix : ""
      prompt.root ? this.prompt.root = prompt.root : ""
      prompt.postfix ? this.prompt.postfix = prompt.postfix : ""
      prompt.styles ? this.prompt.styles = prompt.styles : ""
    }
    if (!rl) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      setPrompt()
      rl.prompt();
      rl.on('line', (line) => {
        var args=line.trim().match(/".*"|'.*'|\S+/g)
        command.command.run(args)
        rl.prompt();
      }).on('close', () => {
        if(callback)
          callback()
        process.exit(0);
      });
    }
    
  },
  exit(){
    process.exit(0);
  }
}