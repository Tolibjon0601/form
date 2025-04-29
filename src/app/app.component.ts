import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // faqat RouterOutlet kerak
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ko'plik bo'lishi kerak
})
export class AppComponent {}
