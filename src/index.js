import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';
import { Library } from './Library.js';

//create app
const library = new Library();
console.log(library);

// TEST 1: Did the first project + todo get created?
console.log("Project name:", library.getActiveProject().getProjectName());           // "edit project"
console.log("Todo title:", library.getActiveTodo().title);                    // "edit title"
console.log("Todo description:", library.getActiveTodo().description);       // "edit description"
console.log("Number of projects:", library.getProjects().length);             // 1
console.log("Number of todos in project:", library.getActiveProject().getTodos().length); // 1

// TEST 2: Edit the project name
library.editProject("My Awesome Project");
console.log("After edit → Project name:", library.getActiveProject().getProjectName());

// TEST 3: Edit the active todo
library.editTodo("Learn JavaScript", "Master TOP project", "2025-12-31", "high");
console.log("After edit → Todo title:", library.getActiveTodo().title);
console.log("After edit → Priority:", library.getActiveTodo().priority);

// TEST 4: Create a second project and switch to it
const workProject = library.createProject("Work");
library.setActiveProject(workProject);
console.log("Switched → Active project:", library.getActiveProject().getProjectName());
console.log("Active todo should be null:", library.getActiveTodo()); // null

// TEST 5: Add a new todo to the Work project
const newTodo = library.createTodo("Finish report", "For boss", "2025-11-30", "high");
library.getActiveProject().addTodo(newTodo);
library.setActiveTodo(newTodo);
console.log("New todo in Work:", library.getActiveProject().getTodos()[0].title);

console.log(library);
