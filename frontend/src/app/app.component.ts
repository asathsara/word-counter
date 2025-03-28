import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { Note } from './models/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, NoteItemComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  faCopy = faCopy;
  faPaste = faPaste;
  faTrash = faTrash;

  text: string = ''; // Stores user input
  wordCount: number = 0;
  sentenceCount: number = 0;
  charCount: number = 0;

  // Function to count words, sentences, and characters
  updateCounts() {
    this.charCount = this.text.length; // Character count
    this.wordCount = this.text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Word count
    this.sentenceCount = this.text
      .split(/[.!?]/)
      .filter((sentence) => sentence.trim().length > 0).length; // Sentence count
  }

  // Copy text
  copyText() {
    navigator.clipboard
      .writeText(this.text)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch((err) => console.error('Could not copy text: ', err));
  }

  // Paste text
  async pasteText() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      this.text += clipboardText; // Append the pasted text
      this.updateCounts();
    } catch (error) {
      console.error('Failed to read clipboard: ', error);
    }
  }

  // Clear text
  clearText() {
    this.text = '';
    this.updateCounts();
  }

  title: string = '';

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
    if (this.title.trim()) {
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
    this.updateCounts(); // Reset counts
  }
}
