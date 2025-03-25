import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NoteItemComponent } from "./components/note-item/note-item.component";
import { Note } from './models/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, NoteItemComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  faCopy = faCopy;
  faPaste = faPaste;
  faTrash = faTrash;

  // Sample notes
  notes: Note[] = [
    { id: 1, title: 'Angular Basics', content: 'Learn about components, modules, and services.', date: '03/23/2025' },
    { id: 2, title: 'TypeScript Tips', content: 'Understand types, interfaces, and generics.', date: '03/24/2025' }
  ];

  removeNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
