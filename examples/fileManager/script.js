// this is an app exemple to test the library
import {SmartCmd ,ERRORS} from "../../index.mjs"
let commande = new SmartCmd()
let options = {
    description : "help",
    params:[
        ['--help',{required:true}]
    ]
}

commande.defineCmd(null,(file)=>{
    console.log("runing :",file,)
},options,errObj=>{
    console.log("error",errObj)
})


commande.run()