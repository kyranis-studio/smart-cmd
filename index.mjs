import readline from 'readline'
import { CommandsParse, normalizeCmd,setDefaults,generateHelp ,initOptions} from "./lib/commandsHelpers.mjs"
import { checkRequired,ErrorHandler,showError,ERRORS as _ERRORS} from "./lib/errorsHandler.mjs"
import { Prompt } from "./lib/prompt.mjs"
export const SmartCmd = class SmartCmd {
    _cmdTree = {}
    _options = {}
    _generatedHelp = []
    combineFlags = true
    useEqualSign = true
    destructFunctionArgument = true
    errorsHandlingMethod = _ERRORS.handler.generateHelp // show-errors / ignore 
    defineCmd(cmdArray, fnCallback, options, errCallback) {
        options = initOptions(options)
        let branche = this._cmdTree
        let commandPath = []
        if(!cmdArray || cmdArray.length == 0){
            this._cmdTree = {
                $_fn: fnCallback,
                $_options: options,
                $_err: errCallback
            }
        }
        for (const i in cmdArray) {
            let key = cmdArray[i]
            if (branche[key] == undefined) {
                if (cmdArray.length - 1 == i) {
                    branche[key] = {
                        $_fn: fnCallback,
                        $_options: options,
                        $_err: errCallback
                    }
                } else {
                    branche[key] = {}
                }
            }
            commandPath.push(key)
            branche = branche[key]
        }
        this._generatedHelp.push({
            commands:commandPath.join(" "),
            description:options.description,
            inputs:options.inputs.map(input=>{
                return [input[0],input[1].description]
            }),
            flags : options.flags.map(flag=>{
                return flag
            }),
            params:options.params.map(param=>{
                let name = param[0]
                let description = ""
                if(param.description) description = param.description
                return [name,description]
            })
        })
    }

    run(cmdLine,prompt) {
        let args =[]
        if(cmdLine){
            cmdLine.trim().split(/[\s]+(?=["'])|(?<=["'])[\s]+/).forEach(arg => {
                if(/['"]/.test(arg)){
                    args.push(arg.replace(/["']/g,"")) 
                }else{
                    args.push(...arg.split(" "))
                }
            });
        }else{
            args = Array.prototype.slice.call(process.argv.slice(2, process.argv.length))
        }
        let branche = this._cmdTree
        let options = null
        let fn = null
        let err = null
        let inputs = []
        let commandPath = []
        if(this._cmdTree.$_options){
            options = this._cmdTree.$_options
            fn = this._cmdTree.$_fn
            err = this._cmdTree.$_err
        }
        args = normalizeCmd(args, this.combineFlags);
        for (const subCmd of args) {
            if (branche[subCmd]) {
                branche = branche[subCmd]
                commandPath.push(subCmd)
                if(branche.$_options){
                    fn = branche.$_fn
                    err = branche.$_err
                    options = branche.$_options
                }
            } else {
                inputs.push(subCmd)
            }
        }
        try {
            if(options){
                let argsParse = new CommandsParse(inputs, options, this.useEqualSign)
                checkRequired(argsParse, options)
                setDefaults(argsParse,options)
                if (fn){
                    if(this.destructFunctionArgument){
                        fn(...argsParse.inputs, argsParse,prompt)
                    }else{
                        fn(argsParse.inputs, argsParse,prompt)
                    }
                    if(prompt){
                        if(prompt._quit){
                            return false
                        }else{
                            return prompt.toString()
                        }
                    }
                }
            }else{
                if(args.length == 0){
                    throw new ErrorHandler(_ERRORS.command.noDefaultAction , args.join(' '))
                }else{
                    throw new ErrorHandler(_ERRORS.command.invalid , args.join(' '))
                }
            }
        } catch (err) {
            switch (this.errorsHandlingMethod) {
                case _ERRORS.handler.generateHelp:
                    generateHelp(this._generatedHelp,commandPath)
                    break;
                case _ERRORS.handler.showError:
                    showError(err)
                    break;
                case _ERRORS.handler.ignore:
                    if(options){
                        let argsParse = new CommandsParse(inputs, options, this.useEqualSign)
                        //mapInput(argsParse.inputs,options.inputs)
                        if (fn){
                            fn(...argsParse.inputs, argsParse,prompt)
                            if(prompt) return prompt.toString()
                        }
                    }
                    break;
            }
        }
    }

    repLoop(promptConfig) {
        let prompt = new Prompt(promptConfig)
        let quitMessage = ""
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal:true,
            removeHistoryDuplicates :true,
            prompt: prompt.toString()
        });

        rl.prompt();

        rl.on('line', (line) => {
            let promptString = this.run(line.trim(),prompt)
            if(promptString){
                rl._prompt = promptString
            }else if(promptString == false){
                quitMessage = prompt._quitMessage
                rl.close()
            }
            rl.prompt();
        }).on('close', () => {
            console.log(quitMessage);
            process.exit(0);
        });
    }
}

export const ERRORS = _ERRORS