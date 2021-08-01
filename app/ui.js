import {checkboxs} from "../lib/console-ui/checkboxs.mjs/"
import readline from 'readline'

//checkboxs()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ""
});
rl.write('Delete this!');
process.stdout.clearLine()
//process.stdout.write('\x1B[2J\x1B[0f');
console.log(process.stdout)