const readline = require('readline');
var print = require('terminal-kit').terminal;

exports.terminal={
  prefix:"",
  delimiter:"",
  postfix:"",
  init({prefix,root,postfix,delemiter}){
    this.prefix=prefix
    this.delimiter=delemiter
    this.postfix=postfix
    this.pushPrompt(root)
    this.prompt=`${prefix}${this.promptArray.join("")}${postfix}`
  },
  prompt:"",
  promptArray:[],
  pushPrompt(prompt){
    this.promptArray.push(prompt)
    this.prompt=`${this.prefix}${this.promptArray.join(this.delimiter)}${this.postfix}`
  },
  popPrompt(){
    if(this.promptArray.length>1){
      this.promptArray.pop()
      this.prompt=`${this.prefix}${this.promptArray.join(this.delimiter)}${this.postfix}`
    }
  },
  run(){
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.prompt
    });
    rl.setPrompt(this.prompt)
    rl.prompt();
    rl.on('line', (line) => {
      rl.setPrompt(this.prompt)
      print.error.red(line)
      console.log("")
      rl.prompt();
    }).on('close', () => {
      console.log('Have a great day!');
      process.exit(0);
    });
  }
}

