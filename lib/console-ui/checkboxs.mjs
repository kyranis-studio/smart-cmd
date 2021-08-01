import readline from 'readline'
export let checkboxs = ()=>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "checkbox"
    });
    
    rl.prompt(true);

    rl.on('line', (line) => {
        console.log(rl.getCursorPos())
        
        process.stdout.write('\u001B['+rl.getCursorPos().cols+';0f')
        
    }).on('close', () => {
        process.exit(0);
    });
    
}
//process.stdout.write('\u001B['+rl.getCursorPos().cols+';0f')