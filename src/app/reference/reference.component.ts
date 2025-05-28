import { Component } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ReferenceComponent {
  slides = [
    { text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" }
  ];

  currentIndex = 0;
  slideDirection: 'left' | 'right' = 'right';

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
