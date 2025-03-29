
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  wordCount: number = 0;
  sentenceCount: number = 0;
  charCount: number = 0;

  @Input() text: string = ''; 
  @Output() textChange = new EventEmitter<string>();
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.updateCounts();
    }
  }

  // Function to count words, sentences, and characters
  updateCounts() {
    this.textChange.emit(this.text);
    this.charCount = this.text.length; // Character count
    this.wordCount = this.text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Word count
    this.sentenceCount = this.text
      .split(/[.!?]/)
      .filter((sentence) => sentence.trim().length > 0).length; // Sentence count
  }
}
