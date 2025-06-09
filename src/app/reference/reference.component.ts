import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { TranslationService } from '../services/translation.service';
import 'swiper/element/bundle';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferenceComponent {
  
  translation = inject(TranslationService);

  slidesEn = [
    { text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" }
  ];

  slidesDe = [
    { text: "Carla ist eine fantastische Teamplayerin!", author: "Anna", position: "Frontend-Entwicklerin" },
    { text: "Ihre Codequalität ist herausragend.", author: "Ben", position: "Teamkollege" },
    { text: "Immer positiv und hilfsbereit.", author: "Dario", position: "Teamkollege" },
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
