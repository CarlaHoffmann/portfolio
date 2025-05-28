import { Component } from '@angular/core';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent {
  slides = [
    { text: "Carla is a fantastic team player!", author: "Anna" },
    { text: "Her code quality is outstanding.", author: "Ben" },
    { text: "Always positive and helpful.", author: "Dario" },
    { text: "Brings great energy to every project.", author: "Eva" }
  ];

  currentIndex = 0;

  get prevIndex() {
    return (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this.slides.length;
  }

  goPrev() {
    this.currentIndex = this.prevIndex;
  }

  goNext() {
    this.currentIndex = this.nextIndex;
  }
}
