import { Todo } from './Todo.js';
import { Project } from './Project.js';

class Library {
    constructor() {
        this.projects = [];

        this.activeProject = new Project("edit project");
        this.projects.push(this.activeProject);

        this.activeTodo = new Todo("edit title", "edit description", "edit due date", "edit priority: low/normal/high");
        this.activeProject.addTodo(this.activeTodo);
    }

    //projects
    setActiveProject(project) {
        this.activeProject = project;
        this.activeTodo = null;
    }

    getActiveProject() {
        return this.activeProject;
    }

    createProject(name = "New Project") {
        const project = new Project(name);
        this.projects.push(project);
        
        return project;
    }

    editProject(newName) {
        this.activeProject.name = newName;
    }
    
    //todos
    setActiveTodo(todo) {
        this.activeTodo = todo;
    }

    createTodo(title, desc = "", dueDate="", priority="") {
        const todo = new Todo(title, desc, dueDate, priority);

        return todo;
    }

    editTodo(newTitle, newDesc, newDate, newPriority) {
        const todo = this.activeTodo;

        todo.title = newTitle;
        todo.description = newDesc;
        todo.dueDate = newDate;
        todo.priority = newPriority;
    }

    getActiveTodo() {
        return this.activeTodo;
    }

    getProjects() {
        return this.projects;
    }

}

export { Library };