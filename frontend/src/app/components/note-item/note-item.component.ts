import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent {
  @Input() note!: Note; // Receive a full Note object
  @Output() deleteNote = new EventEmitter<number>(); // Emit the note ID
  @Output() selectNote = new EventEmitter<Note>(); // Emit the selected note

  onDelete() {
    if (this.note._id != null) {
      this.deleteNote.emit(this.note._id); // Emit the note's ID
    }
  }

  onSelect() {
    this.selectNote.emit(this.note); // Emit the selected note
  }
}
