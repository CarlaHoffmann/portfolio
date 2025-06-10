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
    { text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { text: "Most positive and helpful.", author: "Damian", position: "Partner" },
    { text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" }
  ];

  slidesDe = [
    { text: "Carla ist eine fantastische Teamplayerin!", author: "Anna", position: "Frontend-Entwicklerin" },
    { text: "Ihre Codequalität ist herausragend.", author: "Ben", position: "Teamkollege" },
    { text: "Immer positiv und hilfsbereit.", author: "Dario", position: "Teamkollege" },
    { text: "Sehr positiv und hilfsbereit.", author: "Damian", position: "Kollege" },
    { text: "Bringt großartige Energie in jedes Projekt.", author: "Eva", position: "Frontend-Entwicklerin" }
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
  wrapperTransform = 'translateX(-22%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  isAnimating = false;
  visibleSlides: any[] = [];

  ngOnInit() {
    this.updateVisibleSlides();
  }

  updateVisibleSlides() {
    const visible = 5;
    const half = Math.floor(visible / 2);
    const total = this.slides.length;
    const result = [];
  
    for (let offset = -half; offset <= half; offset++) {
      let idx = (this.currentIndex + offset + total) % total;
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

  get prevIndex() {
    return (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this.slides.length;
  }

  // goPrev() {
  //   this.currentIndex = this.prevIndex;
  // }
  goPrev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.slideDirection = 'left';
    this.wrapperTransform = 'translateX(20%)';
  }

  // goNext() {
  //   this.currentIndex = this.nextIndex;
  // }
  goNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.slideDirection = 'right';
    this.wrapperTransform = 'translateX(-60%)';
  }

  onTransitionEnd() {
    if (!this.isAnimating) return;

    if (this.slideDirection === 'right') {
      this.currentIndex = this.nextIndex;
    } else if (this.slideDirection === 'left') {
      this.currentIndex = this.prevIndex;
    }

    // Reset Wrapper Position ohne Animation (für Endlosschleife)
    this.transition = 'none';
    this.wrapperTransform = 'translateX(-20%)';
    this.updateVisibleSlides();

    // Kurze Verzögerung, dann Transition wieder aktivieren
    setTimeout(() => {
      this.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
      this.isAnimating = false;
    }, 50);
  }
}
