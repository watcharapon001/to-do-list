import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css'
})
export class EditModalComponent implements OnChanges {
  @Input() todo: Todo | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  editTitle = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo'] && this.todo) {
      this.editTitle = this.todo.title;
    }
  }

  onSave() {
    if (this.editTitle.trim()) {
      this.save.emit(this.editTitle.trim());
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
