
// this is an app exemple to test the library
import {SmartCmd,ERRORS} from "../index.mjs"
let commande = new SmartCmd()
commande.useEqualSign = true
commande.combineFlags = false
let options = {
    description : "Exit command",
    flags:[
        ['-f','force exit']
    ],
    params:[
        ["--show-message",{description:"show message",default:true}]
    ],
    inputs :[
        ["message",{description:"Message to show",default:"Hi There !!!!"}],
    ]
}

commande.defineCmd(['exit'],(inputs,cmdHelpers,prompt)=>{
    prompt.quit(message)
},options,errObj=>{
    console.log("error",errObj)
})

options = {
    description : "Select database",
    inputs :[
        ["dbname",{description:"Source To copy from",required:true}],
        ["root",{description:"Nothing to show",default:"ok"}]
    ]
}

commande.defineCmd(['select','db'],(inputs,argsHelpers,prompt)=>{
    console.log("log "+inputs)
},options,errObj=>{
    console.log("error",errObj)
})

commande.repLoop({prefix:"[kyranis-studio]/",suffix:">",separator:"/",promptArray:['Home','Kyranis']})

