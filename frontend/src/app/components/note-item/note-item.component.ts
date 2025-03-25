import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent {
  @Input() note!: Note;  // Receive a full Note object
  @Output() deleteNote = new EventEmitter<number>(); // Emit the note ID

  onDelete() {
    this.deleteNote.emit(this.note.id); // Emit the note's ID
  }
}
