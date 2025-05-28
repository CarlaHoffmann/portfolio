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
    { text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" }
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
