import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule],
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
  translation = inject(TranslationService);

  slidesEn = [
    { id: 0, text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { id: 1, text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { id: 2, text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { id: 3, text: "Most positive and helpful.", author: "Damian", position: "Partner" },
    { id: 4, text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" }
  ];
  
  slidesDe = [
    { id: 0, text: "Carla ist eine fantastische Teamplayerin!", author: "Anna", position: "Frontend-Entwicklerin" },
    { id: 1, text: "Ihre Codequalität ist herausragend.", author: "Ben", position: "Teamkollege" },
    { id: 2, text: "Immer positiv und hilfsbereit.", author: "Dario", position: "Teamkollege" },
    { id: 3, text: "Sehr positiv und hilfsbereit.", author: "Damian", position: "Kollege" },
    { id: 4, text: "Bringt großartige Energie in jedes Projekt.", author: "Eva", position: "Frontend-Entwicklerin" }
  ];

  translations = {
    en: {
      headline: 'What my colleagues say about me'
    },
    de: {
      headline: 'Das sagen meine Kolleg:innen über mich'
    }
  };

  get t() {
    return this.translations[this.translation.lang()];
  }

  get slides() {
    return this.translation.lang() === 'de' ? this.slidesDe : this.slidesEn;
  }


  currentIndex = 0;
  slideDirection: 'left' | 'right' = 'right';

  // wrapperTransform = 'translateX(-33.3333%)';
  wrapperTransform = 'translateX(-32%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  isAnimating = false;
  visibleSlides: any[] = [];

  ngOnInit() {
    this.updateVisibleSlides();
  }

  get currentSlideId() {
    // Das mittlere Slide in visibleSlides ist immer das aktuelle
    return this.visibleSlides[2]?.id;
  }

  updateVisibleSlides() {
    // Zeige immer 5 Slides (2 vor, current, 2 nach)
    const visible = 5;
    const half = Math.floor(visible / 2);
    const result = [];
    for (let offset = -half; offset <= half; offset++) {
      let idx = (offset + this.slides.length) % this.slides.length;
      let slideType = '';
      if (offset === 0) slideType = 'current';
      else if (offset < 0) slideType = `prev${Math.abs(offset)}`;
      else slideType = `next${offset}`;
      result.push({
        ...this.slides[idx],
        slideType
      });
    }
    this.visibleSlides = result;
  }

  goPrev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(0%)'; // nach rechts animieren
  }

  goNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(-49%)'; // nach links animieren
  }

  onTransitionEnd() {
    if (!this.isAnimating) return;

    // Array-Rotation erst nach Animation!
    if (this.wrapperTransform === 'translateX(-49%)') { // Next
      // Englisch
      if (this.slidesEn.length > 0) {
        const first = this.slidesEn.shift();
        if (first) this.slidesEn.push(first);
      }
      // Deutsch
      if (this.slidesDe.length > 0) {
        const first = this.slidesDe.shift();
        if (first) this.slidesDe.push(first);
      }
    } else if (this.wrapperTransform === 'translateX(0%)') { // Prev
      // Englisch
      if (this.slidesEn.length > 0) {
        const last = this.slidesEn.pop();
        if (last) this.slidesEn.unshift(last);
      }
      // Deutsch
      if (this.slidesDe.length > 0) {
        const last = this.slidesDe.pop();
        if (last) this.slidesDe.unshift(last);
      }
    }

    // Wrapper sofort zurück zur Mittelposition (ohne Animation)
    this.transition = 'none';
    this.wrapperTransform = 'translateX(-24.5%)';
    this.updateVisibleSlides();

    // Transition wieder aktivieren
    setTimeout(() => {
      this.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
      this.isAnimating = false;
    }, 20);
  }
}
