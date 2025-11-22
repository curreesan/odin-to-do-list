import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';

console.log("Todo class ready!");

const task = new Todo("title", "desc", "date", "normal");
console.log(task);

console.log(task.isCompleted);
task.toggleCompleted();
console.log(task.isCompleted)

const project = new Project("School");
console.log(project);
const task1 = new Todo("math hw", "do algebra sums from textbook", "today", "high");
const task2 = new Todo("science hw", "learn heart diagram for test tomorrow", "today", "high");
project.addTodo(task1);
project.addTodo(task2);
console.log(project.getTodos())
project.removeTodo(1);
console.log(project)
