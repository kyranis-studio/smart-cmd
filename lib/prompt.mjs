export class Prompt {
    prefix = ''
    suffix = ''
    separator = ''
    promptArray = []

    constructor(config){
        this.prefix = config && config.prefix ? this.prefix = config.prefix : this.prefix = '' 
        this.suffix = config && config.suffix ? this.suffix = config.suffix : this.suffix = ''
        this.separator = config && config.separator ? this.separator = config.separator : this.separator = ''
        this.promptArray = config && config.promptArray ? this.promptArray = config.promptArray : this.promptArray = []
    }
    _quitMessage = ""
    _quit = false
    setPrefix(prefix){
        this.prefix = prefix
        return this.toString()
    }

    setSeparator(sepatator){
        this.sepatator = sepatator
        return this.toString()
    }

    setSuffix(suffix){
        this.suffix = suffix
        return this.toString()
    }

    push(items){
        if(typeof items != 'string'){
            this.promptArray.push(...items)
        }else{
            this.promptArray.push(items)
        }
        return this.toString()
    }

    pop(){
        this.promptArray.pop()
        return this.toString()
    }

    toString(){
        return `${this.prefix}${this.promptArray.join(this.separator)}${this.suffix}`
    }

    quit(message){
        if(message) this._quitMessage = message
        this._quit = true
    }
}