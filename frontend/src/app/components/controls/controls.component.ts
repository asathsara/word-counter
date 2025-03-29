import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controls',
  imports: [FontAwesomeModule,],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  faCopy = faCopy;
  faPaste = faPaste;
  faTrash = faTrash;

  @Input() text: string = ''; 
  @Output() textChange = new EventEmitter<string>();
  

  updateParent() {
    this.textChange.emit(this.text);
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
        this.updateParent(); 
      } catch (error) {
        console.error('Failed to read clipboard: ', error);
      }
    }
  
    // Clear text
    clearText() {
      this.text = '';
      this.updateParent();
    }
}
