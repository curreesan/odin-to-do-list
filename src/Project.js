class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoIndex) {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos.splice(todoIndex, 1);
    }
  }

  getTodos() {
    return this.todos;
  }

  getProjectName() {
    return this.name;
  }
}

export { Project };
