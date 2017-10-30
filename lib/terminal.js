const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">"
});
const command = require('../index');
exports.terminal={
  promptArray:[],
  prompt:{
    prefix:"",
    root:"",
    postfix:">"
  },
  setPrompt(){
    rl.setPrompt(this.promptArray.join("")) 
  },
  getPrompt(){
    return this.promptArray
  },
  pushPrompt(prompt){
    var index=this.promptArray.length-1
    this.promptArray.splice(index,0,prompt)
    this.setPrompt()
  },
  popPrompt(){
    if(this.promptArray.length>3){
      var index=this.promptArray.length-2
      this.promptArray.splice(index,1)
      this.setPrompt()
    }
  },
  init(prompt){
    if(prompt){
      if(!prompt.prefix){
        this.prompt.prefix=""
      }else{
        this.prompt.prefix=prompt.prefix
      }
      if(!prompt.root){
        this.prompt.root=""
      }else{
        this.prompt.root=prompt.root
      }
      if(!prompt.postfix){
        this.prompt.postfix=">"
      }else{
        this.prompt.postfix=prompt.postfix
      }
      this.promptArray.push(this.prompt.prefix,this.prompt.root,this.prompt.postfix)
    }
  },
  run(){
    this.setPrompt()
    rl.prompt();
    rl.on('line', (line) => {
      //rl.setPrompt("NOJSDB>")
      command.command.run(line.split(" "))
      rl.prompt();
    }).on('close', () => {
      console.log('exit');
      process.exit(0);
    });
  }
}