var print = require('terminal-kit').terminal;
var argToArray=function(args){
  return Array.prototype.slice.call(args)
}
var format = function ([msg, ...styles]) {
  var strike=false
  var style = {
    "-i": "^/",

    "-b": "^+",

    "-u": "^_",

    "-I": "^!",

    "-Iw": "^#^!"
  }
  styles.forEach((stl) => {
    if(stl!="-s"){
      msg = `${style[stl]}${msg}`
    }else{
      strike=true
    }
  });
  if(strike){
    print.strike(msg)
  }else{
    print(msg)
  }
}

exports.cout = {
  log() {
    var args = argToArray(arguments)
    format(args)
    return this
  },
  success() {
    var args = argToArray(arguments)
    var [msg]=args
    msg="^g"+msg
    args[0]=msg
    format(args)
    return this
  },
  error() {
    var args = argToArray(arguments)
    var [msg]=args
    msg="^r"+msg
    args[0]=msg
    format(args)
    return this
  },
  warning() {
    var args = argToArray(arguments)
    var [msg]=args
    msg="^y"+msg
    args[0]=msg
    format(args)
    return this
  },
  info() {
    var args = argToArray(arguments)
    var [msg]=args
    msg="^m"+msg
    args[0]=msg
    format(args)
    return this
  }
}