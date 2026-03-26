import readline from 'node:readline/promises';
import { getAll } from "./todos.js";
import { clearScreen, handleInput, render } from "./ui.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function loop() {
    while (true) {
        clearScreen();
        
        const todos = getAll();
        render(todos);
        
        const input = await rl.question('> ');

        const message = handleInput(input, todos);
        if (message) {
            console.error(message);
            await rl.question("Paina Enter jatkaaksesi...");
        }
    }
}

loop()
