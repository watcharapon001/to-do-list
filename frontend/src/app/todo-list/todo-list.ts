import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { EditModalComponent } from '../edit-modal/edit-modal';
import { DeleteModalComponent } from '../delete-modal/delete-modal';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EditModalComponent, DeleteModalComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  errorMessage = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  editingTodo: Todo | null = null;
  deletingTodo: Todo | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    return this.todos;
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to load todos. Please try again.';
        console.error(err);
      }
    });
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.createTodo(this.newTodoTitle.trim()).subscribe({
        next: (newTodo) => {
          this.todos.push(newTodo);
          this.newTodoTitle = '';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to add todo. Please try again.';
          console.error(err);
        }
      });
    }
  }

  deleteTodo(todo: Todo) {
    this.deletingTodo = todo;
  }

  confirmDelete() {
    if (this.deletingTodo) {
      const id = this.deletingTodo.id;
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.errorMessage = '';
          this.deletingTodo = null;
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete todo. Please try again.';
          console.error(err);
        }
      });
    }
  }

  cancelDelete() {
    this.deletingTodo = null;
  }

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        todo.completed = updatedTodo.completed;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to update todo. Please try again.';
        todo.completed = !updatedTodo.completed; // Revert
        console.error(err);
      }
    });
  }

  openEditModal(todo: Todo) {
    this.editingTodo = todo;
  }

  closeEditModal() {
    this.editingTodo = null;
  }

  saveEdit(newTitle: string) {
    if (this.editingTodo) {
      const updatedTodo = { ...this.editingTodo, title: newTitle };
      this.todoService.updateTodo(updatedTodo).subscribe({
        next: () => {
          const index = this.todos.findIndex(t => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index].title = newTitle;
          }
          this.errorMessage = '';
          this.closeEditModal();
        },
        error: (err) => {
          this.errorMessage = 'Failed to edit todo. Please try again.';
          console.error(err);
        }
      });
    }
  }
}
