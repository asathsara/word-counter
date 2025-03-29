import { Component } from '@angular/core';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { Note } from './models/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';
import { CounterComponent } from "./components/counter/counter.component";
import { ControlsComponent } from "./components/controls/controls.component";

@Component({
  selector: 'app-root',
  imports: [NoteItemComponent, CommonModule, FormsModule, CounterComponent, ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
 

  text: string = ''; // Stores user input
  title: string = '';

  onTextChange(newText: string) {
    this.text = newText;
    console.log('Text changed:', this.text); // Log the updated text
  }

  notes: Note[] = []; // Empty initially, will be loaded from API
  editingNoteId: number | null = null; // Track the note being edited

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes(); // Fetch notes when component initializes
  }

  loadNotes() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      console.log('Notes loaded:', this.notes); // Log the loaded notes
    });
  }

  removeNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note._id !== id);
    });
  }
  
  saveNote() {
      if (this.editingNoteId) {
        // Update existing note
        const updatedNote: Note = {
          _id: this.editingNoteId,
          title: this.title,
          content: this.text,
          date: new Date().toLocaleDateString(),
        };

        this.noteService.updateNote(updatedNote).subscribe(() => {
          this.notes = this.notes.map((note) =>
            note._id === this.editingNoteId ? updatedNote : note
          );
          this.clearInputs();
        });
      } else {
        // Save new note
        const newNote: Note = {
          title: this.title,
          content: this.text,
          date: new Date().toLocaleDateString(),
        };

        this.noteService.addNote(newNote).subscribe((savedNote) => {
          this.notes.push(savedNote);
          this.clearInputs();
        });
      }
  }

  selectNote(note: Note) {
    this.title = note.title;
    this.text = note.content;
    this.editingNoteId = note._id ?? null; // Store the ID for updating or set to null if undefined
  }

  clearInputs() {
    this.title = '';
    this.text = '';
    this.editingNoteId = null;
  }
}