import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  // Get all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:5000/api/notes/');
  }

  // Add a note
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:5000/api/notes/', note);
  }

  // Update a note
  deleteNote(id: number): Observable<Note> {
    return this.http.delete<Note>(`http://localhost:5000/api/notes/${id}`);
  }
}
