import { Library } from './Library.js';

class DOMController {
    constructor() {
        this.library = new Library();

        this.projectList = document.querySelector('.project-names ul');
        this.todoList = document.querySelector('.todo-names ul');
        this.detailList = document.querySelector('.todo-details ul');

        this.addProjectBtn = document.querySelector('.add-project');
        this.editProjectBtn = document.querySelector('.edit-project');
        this.deleteProjectBtn = document.querySelector('.delete-project');
        
        this.addTodoBtn = document.querySelector('.add-todo');
        this.editTodoBtn = document.querySelector('.edit-todo');
        this.deleteTodoBtn = document.querySelector('.delete-todo');

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        this.addProjectBtn.addEventListener('click', () => this.handleAddProject());
        this.editProjectBtn.addEventListener('click', () => this.handleEditProject());
        this.deleteProjectBtn.addEventListener('click', () => this.handleDeleteProject());

        this.addTodoBtn.addEventListener('click', () => this.handleAddTodo());
        this.editTodoBtn.addEventListener('click', () => this.handleEditTodo());
        this.deleteTodoBtn.addEventListener('click', () => this.handleDeleteTodo());
    }

    render() {
        this.renderProjects();
        this.renderTodos();
        this.renderDetails();
    }

    renderProjects() {
        this.projectList.innerHTML = '';
        this.library.getProjects().forEach(proj => {
            const li = document.createElement('li');
            li.textContent = proj.name;
            if (proj === this.library.getActiveProject()) li.classList.add('active');

            li.addEventListener('click', () => {
                this.library.setActiveProject(proj);
                this.render();
            });

            this.projectList.appendChild(li);
        });
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        const todos = this.library.getActiveProject()?.getTodos() || [];

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            if (todo === this.library.getActiveTodo()) li.classList.add('active');
            if (todo.isCompleted) li.style.opacity = '0.6';

            li.addEventListener('click', () => {
                this.library.setActiveTodo(todo);
                this.render();
            });

            this.todoList.appendChild(li);
        });
    }

    renderDetails() {
        const todo = this.library.getActiveTodo();
        this.detailList.innerHTML = '';

        if (!todo) {
            this.detailList.innerHTML = '<li><em>Select a task to see details</em></li>';
            return;
        }

        this.detailList.innerHTML = `
            <li><strong>Title:</strong> ${todo.title}</li>
            <li><strong>Description:</strong> ${todo.description || '—'}</li>
            <li><strong>Due Date:</strong> ${todo.dueDate || '—'}</li>
            <li><strong>Priority:</strong> ${todo.priority || '—'}</li>
            <li><strong>Completed:</strong> ${todo.isCompleted ? 'Yes' : 'No'}</li>
        `;
    }

    // Button handlers
    handleAddProject() {
        const name = prompt("New project name:", "New Project");
        if (name) {
            this.library.createProject(name);
            this.render();
        }
    }

    handleEditProject() {
        const newName = prompt("Edit project name:", this.library.getActiveProject().name);
        if (newName) {
            this.library.editProject(newName);
            this.render();
        }
    }

    handleDeleteProject() {
        if (this.library.getProjects().length === 1) {
            return alert("Cannot delete the last project!");
        }
        if (confirm("Delete this project and all its todos?")) {
            const projectToDelete = this.library.getActiveProject();
            const index = this.library.getProjects().indexOf(projectToDelete);
            this.library.getProjects().splice(index, 1);
            
            // Switch to first remaining project
            this.library.setActiveProject(this.library.getProjects()[0] || null);
            this.render();
        }
    }

    handleAddTodo() {
        const title = prompt("Todo title:");
        if (title) {
            const todo = this.library.createTodo(title);
            this.library.getActiveProject().addTodo(todo);
            this.render();
        }
    }

    handleEditTodo() {
        const todo = this.library.getActiveTodo();
        if (!todo) return alert("Select a todo first!");

        const title = prompt("Title:", todo.title) || todo.title;
        const desc  = prompt("Description:", todo.description) || todo.description;
        const date  = prompt("Due date:", todo.dueDate) || todo.dueDate;
        const prio  = prompt("Priority:", todo.priority) || todo.priority;

        this.library.editTodo(title, desc, date, prio);
        this.render();
    }

    handleDeleteTodo() {
        const todo = this.library.getActiveTodo();
        if (!todo) return alert("Select a todo to delete!");
        if (confirm("Delete this todo?")) {
            const index = this.library.getActiveProject().getTodos().indexOf(todo);
            this.library.getActiveProject().removeTodo(index);
            this.library.setActiveTodo(null);
            this.render();
        }
    }
}

export { DOMController };