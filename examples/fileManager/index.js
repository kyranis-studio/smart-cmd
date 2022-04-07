// this is an app exemple to test the library
import {SmartCmd ,ERRORS} from "../../index.mjs"
let commande = new SmartCmd()
commande.useEqualSign = false
commande.combineFlags = false
commande.destructFunctionArgument = true
commande.errorsHandlingMethod = ERRORS.handler.ignore

let options = {
    description : "copy files/directory",
    flags :[
       
    ],
    params:[
       
    ],
    inputs :[
        ["origin",{description:"File/Folder to copy",required:true}],
        ["destination",{description:"Destination path",required:true}],
    ]
}

commande.defineCmd(['copy'],(origin,destination,argsHelpers)=>{
    console.log("runing :",origin,destination)
},options,errObj=>{
    console.log("error",errObj)
})

commande.run()