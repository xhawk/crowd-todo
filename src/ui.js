import { randomUUID } from "crypto";
import { create, remove, toggle } from "./todos.js";

export const render = (todos) => {
  console.log('- Tehtävät -\n');

  todos.forEach((t, i) => {
    const mark = t.completed ? '[x]' : '[ ]';
    console.log(`${mark} ${i + 1}. ${t.title}`);
  });

  console.log('\n----------------');
}

export const handleInput = (input, todos) => {
  input = input.trim();

  if (input === 'q') {
    process.exit(0);
  }

  // toggle: x 2
  if (input.startsWith('x ')) {
    const index = parseInt(input.slice(2)) - 1;
    if (todos[index]) toggle(todos[index].id);
    return;
  }

  // delete: d 3
  if (input.startsWith('d ')) {
    const index = parseInt(input.slice(2)) - 1;
    if (todos[index]) remove(todos[index].id);
    return;
  }

  // otherwise → create todo
  if (input.length > 0) {
    createTodo(input);
  }
}

function createTodo(input) {
    create(randomUUID(), input, new Date().toISOString())
}

export const clearScreen = () => process.stdout.write('\x1Bc');
