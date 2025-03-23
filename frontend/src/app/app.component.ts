import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faPaste, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  faCopy = faCopy;
  faPaste = faPaste;
  faTrash = faTrash;
}
