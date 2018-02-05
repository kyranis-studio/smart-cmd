const chalk = require('chalk');
exports.setStyle = function (text, styles) {
  styledText = text
  if(styles)
  for (style of styles) {
    try{
      styledText = chalk[style](styledText)
    }catch(e){
      throw chalk.red(`${style} is not a knowing style`)
    }
  }
  return styledText
}
exports.log={
  error(msg){
    var styledMsg = exports.setStyle(msg,['red'])
    console.log(styledMsg)
  },
  warning(msg){
    var styledMsg = exports.setStyle(msg,['orange'])
    console.log(styledMsg)
  },
  success(msg){
    var styledMsg = exports.setStyle(msg,['green'])
    console.log(styledMsg)
  },
  info(msg){
    var styledMsg = exports.setStyle(msg,['blue'])
    console.log(styledMsg)
  }
}