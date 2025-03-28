export interface Note {
    _id?: number | null; // Optional ID for the note, can be null for new notes
    title: string;
    content: string;
    date: string;
  }
  