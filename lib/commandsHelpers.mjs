import {ErrorHandler,checkSyntax,ERRORS} from './errorsHandler.mjs'
export const initOptions = (options) =>{
    let _options={
        description:"",
        flags : [],
        params : [],
        inputs : []
    }
    let {description,inputs,params,flags} = options
    if(description != undefined) _options.description = description
    if(flags != undefined) _options.flags = flags
    if(params != undefined) _options.params = params
    if(inputs != undefined) _options.inputs = inputs

    return _options
}

export class CommandsParse {
    inputs = []
    params = {}
    flags = []
    cmdsSequence = []
    constructor(argsArray,options,useEqualSign){
        this.cmdsSequence = argsArray
        let inputIndex = 0
        for (let index = 0; index < this.cmdsSequence.length; index++) {
            let param = this.cmdsSequence[index]
            if(param.startsWith("--") && !this.cmdsSequence[index+1] || param.startsWith("--") && this.cmdsSequence[index+1].startsWith("-")){
                if(checkSyntax(param,options.params,true)){
                    this.params[param.replace("--",'')] = true
                }else{
                    throw new ErrorHandler()
                }
            }else if(param.startsWith("--") && useEqualSign){
                if(this.cmdsSequence[index+1] && this.cmdsSequence[index+1] == "=" && !this.cmdsSequence[index+2].startsWith("-")){
                    let paramValue = this.cmdsSequence[index+2]
                    if(checkSyntax(param,options.params,paramValue)){
                        this.params[param.replace("--",'')] = paramValue
                        index = index + 2
                    }else{
                        throw new ErrorHandler()
                    }
                }else{
                    index = index + 1
                    let errCode = ERRORS.param.missingEqualSign
                    throw new ErrorHandler(errCode,param,{name:"test"})
                }
            }else if(param.startsWith("--") && !useEqualSign){
                if(this.cmdsSequence[index+1] && !this.cmdsSequence[index+1].startsWith("-")){
                    let paramValue = this.cmdsSequence[index+2]
                    if(checkSyntax(param,options.params,paramValue)){
                        this.params[param.replace("--",'')] = paramValue
                        index++
                    }else{
                        throw new ErrorHandler()
                    }
                }
            }else if(param.startsWith("-")){
                if(checkSyntax(param,options.flags)){
                    this.flags.push(param.replace("-",""))
                }else{
                    throw new ErrorHandler()
                }
            }else{
                if(options.inputs.length -1 < inputIndex){
                    throw new ErrorHandler(ERRORS.input.exceeds)
                }else{
                    if(checkSyntax(options.inputs[inputIndex][0],options.inputs[inputIndex][1],param)){
                        this.inputs.push(param)
                    }
                }
                inputIndex ++
            }
        }
    }
}

export const normalizeCmd = (argsArray,combineFlags)=>{
    let normalizeArgs = []
    for (const arg of argsArray) {
        let equalIndex = arg.indexOf("=")
        if(equalIndex >-1 && arg != "=" ){
            if(equalIndex == 0){
                normalizeArgs.push(...["=",arg.replace("=","")])
            }else if(equalIndex == arg.length-1){
                normalizeArgs.push(...[arg.replace("=","") ,"="])
            }else{
                if(arg.startsWith("--")){
                    let paramArray = arg.replace("=",",").split(",")
                    normalizeArgs.push(...[paramArray[0] ,"=",paramArray[1]])
                }else{
                    normalizeArgs.push(arg)
                }
            }
        }else if(!arg.startsWith("--") && arg.startsWith("-") && combineFlags){
            normalizeArgs.push(...arg.replace("-","").split('').map(flag => '-' + flag ))
        }else{
            normalizeArgs.push(arg)
        }
    }
    return normalizeArgs
}

export const setDefaults = (argsParse,options)=>{
    for (let index = 0; index < options.inputs.length; index++) {
        if(!argsParse.inputs[index]){
            argsParse.inputs.push(options.inputs[index][1].default)
        }
    }

    for (let index = 0; index < options.params.length; index++) {
        if(options.params[index][1].default){
            let paramName = options.params[index][0].replace('--',"")
            if(!argsParse.params[paramName]) argsParse.params[paramName] = options.params[index][1].default
        }
    }
}

export const generateHelp = (generatedHelp,commandPath) =>{
    let inputCommands = commandPath.join(" ")
    if(commandPath.length == 0){
        for (const help of generatedHelp) {
            console.log('\x1b[36m%s\x1b[0m',`${help.commands} `,`: ${help.description}`)
            if(help.flags.length > 0) console.log('\t',help.flags.join('\n\t'))
            if(help.params.length > 0) console.log('\t',help.params.join('\n\t'))
        }
    }else{
        for (const help of generatedHelp) {
            if(help.commands.startsWith(inputCommands)){
                console.log('\x1b[36m%s\x1b[0m',`${help.commands} : `,`${help.description}`)
                console.log(`\t ${help.inputs.join(", ")}`)
                if(help.flags.length > 0) console.log('\t',help.flags.join('\n\t'))
                if(help.params.length > 0) console.log('\t',help.params.join('\n\t'))
                }
        }
    }
}
