export const checkSyntax = (param,declaration,value)=>{
    if(param.startsWith("--")){
        for (const item of declaration) {
            if(param == item[0]){
                if( item[1].validateInput){
                    if(!item[1].validateInput(value)){
                        let errCode = ERRORS.param.rongType
                        throw new ErrorHandler(errCode,param)
                    }
                }
                return true
            } 
        }
        let errCode = ERRORS.param.undeclared
        throw new ErrorHandler(errCode,param)
    }else if(param.startsWith("-")){
        for (const item of declaration) {
            if(param == item[0]) return true
        }
        throw new ErrorHandler(ERRORS.flag.undeclared,param)
    }else{
        if(declaration.validateInput != undefined){
            if(!declaration.validateInput(value)){
                let errCode = ERRORS.input.rongType
                throw new ErrorHandler(errCode,param)
            }
        }
    }
    return true
}
export let ERRORS = {
    command:{
        code:1,
        noDefaultAction:11,
        invalid:12
    },
    input:{
        code:2,
        required:21,
        exceeds:22,
        undeclared:23,
        rongType:24,
        undeclaredType:25
    },
    param:{
        code:3,
        required:31,
        undeclared:32,
        missingEqualSign:33,
        undeclaredType:34,
        rongType:35,
    },
    flag:{
        code:4,
        undeclared:41,
    },
    handler:{
        code:5,
        generateHelp:51,
        showError:52,
        ignore:53
    }
}
export const ErrorHandler = function errorHandler(code,name){
    this.name = name
    this.message = ""
    this.code = code
    switch (this.code) {
        case  ERRORS.command.noDefaultAction:
            this.message = " No default command is declared"
            break;
        case ERRORS.command.invalid:
            this.message = this.name + " : Invalid command"
            break;
        case ERRORS.input.required:
            this.message = this.name + " : Input Required"
            break;
        case ERRORS.input.exceeds:
            this.message = "Inputs exceeds max declared variables"
            break;
        case ERRORS.input.rongType:
            this.message =  this.name + " : Input rong type"
            break;
        case ERRORS.param.required:
            this.message = "Parameter Required"
            break;
        case ERRORS.param.missingEqualSign:
            this.message = this.name + " : Parameter missing '=' sign"
            break;
        case ERRORS.param.undeclared:
            this.message = this.name + " : Parameter not declared"
            break;
        case ERRORS.flag.undeclared:
            this.message = this.name + " : Flag not declared"
            break;
        case ERRORS.param.rongType:
            this.message = this.name + " : Parameter rong type"
            break
        default:
            break;
    }
}

export const checkRequired = (argsParse,options)=>{
    let index = 0
    for (const declaration of options.inputs) {
        if((!argsParse.inputs[index]  || argsParse.inputs[index] == "null") && declaration[1].required){
            throw new ErrorHandler(ERRORS.input.required,declaration[0])
        }
        index++
    }
    for (const declaration of options.params) {
        if(declaration[1].required && argsParse.cmdsSequence.indexOf(declaration[0]) ==-1 ){
            throw new ErrorHandler(ERRORS.param.required,declaration[0])
        }
    }
}
export const showError = (err)=>{
    console.log(`code error ${err.code} : ${err.message}`)
}