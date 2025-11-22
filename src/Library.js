import { Todo } from './Todo.js';
import { Project } from './Project.js';

class Library {
    constructor() {
        this.projects = [];

        this.activeProject = new Project("first project");
        this.projects.push(this.activeProject);

        this.activeTodo = new Todo("first task");
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

    //localStorage
    saveToLocalStorage() {
        const data = {
            projects: this.projects.map(project => ({
                name: project.name,
                todos: project.todos.map(todo => ({
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                    isCompleted: todo.isCompleted
                }))
            })),
            activeProjectIndex: this.projects.indexOf(this.activeProject),
            activeTodoIndex: this.activeProject ? this.activeProject.getTodos().indexOf(this.activeTodo) : -1
        };
        localStorage.setItem('todoApp', JSON.stringify(data));
    }
    
    loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('todoApp'));
        if (!data) return false;
        
        // Clear current projects
        this.projects = [];

        // Recreate projects and todos
        data.projects.forEach(projData => {
            const project = new Project(projData.name);
            projData.todos.forEach(todoData => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.isCompleted
                );
                project.addTodo(todo);
            });
            this.projects.push(project);
        });
        
        // Restore active project
        this.activeProject = this.projects[data.activeProjectIndex] || this.projects[0];

        // Restore active todo
        if (this.activeProject && data.activeTodoIndex !== -1) {
            this.activeTodo = this.activeProject.getTodos()[data.activeTodoIndex];
        } else {
            this.activeTodo = null;
        }
        return true;
    }
}

export { Library };