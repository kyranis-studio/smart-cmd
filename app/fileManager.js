// this is an app exemple to test the library
import {SmartCmd} from "../index.mjs"
let commande = new SmartCmd()
commande.useEqualSign = true
commande.combineFlags = false
let booleanType = input =>{
    if(input == 'true' || input == 'false'){
        return true
    }else{
        return false
    }
}
let options = {
    description : "copy files/directory",
    flags :[
        ["-fd","force delete"],
        ["-r",""]
    ],
    params:[
        ["--destination",{required:true,validateInput:booleanType}],
        ["--help",{}]
    ],
    inputs :[
        ["origin",{description:"File/Folder to copy",required:true,validateInput:booleanType}],
        ["destination",{description:"Destination path",required:true}],
    ]
}

commande.defineCmd(['copy'],(origin,destination,argsHelpers)=>{
    console.log("runing :",origin,destination)
},options,errObj=>{
    console.log("error",errObj)
})

commande.run()