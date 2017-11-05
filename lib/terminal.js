const readline = require('readline');
const command = require('../index');
var rl
var setPrompt = function () {
  $this = exports.terminal
  var prefix = $this.prompt.prefix
  var root = $this.prompt.root
  var postfix = $this.prompt.postfix
  var prompt = $this.promptArray.join("")
  rl.setPrompt(`${prefix}${root}${prompt}${postfix}`)
}
exports.terminal = {
  prompt: {
    prefix: "",
    root: "",
    postfix: ">"
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
  pushPrompt(prompt) {
    this.promptArray.push(prompt)
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
  run(prompt) {
    var prefix = ""
    var root = ""
    var postfix = ">"
    if (prompt) {
      prompt.prefix ? this.prompt.prefix = prompt.prefix : ""
      prompt.root ? this.prompt.root = prompt.root : ""
      prompt.postfix ? this.prompt.postfix = prompt.postfix : ""
    }
    if (!rl) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      setPrompt()
      rl.prompt();
      rl.on('line', (line) => {
        command.command.run(line.split(" "))
        rl.prompt();
      }).on('close', () => {
        console.log('exit');
        process.exit(0);
      });
    }
  },
  exit(){
    console.log('exit');
    process.exit(0);
  }
}