import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent implements OnInit, OnDestroy {
  private langSub!: Subscription;
  // translation = inject(TranslationService);

  slidesEn = [
    { id: 0, text: "Carla is a fantastic team player!", author: "Anna", position: "Frontend Developer" },
    { id: 1, text: "Her code quality is outstanding.", author: "Ben", position: "Team Partner" },
    { id: 2, text: "Always positive and helpful.", author: "Dario", position: "Team Partner" },
    { id: 3, text: "Brings great energy to every project.", author: "Eva", position: "Frontend Developer" },
    { id: 4, text: "Most positive and helpful.", author: "Damian", position: "Partner" }
  ];
  
  slidesDe = [
    { id: 0, text: "Carla ist eine fantastische Teamplayerin!", author: "Anna", position: "Frontend-Entwicklerin" },
    { id: 1, text: "Ihre Codequalität ist herausragend.", author: "Ben", position: "Teamkollege" },
    { id: 2, text: "Immer positiv und hilfsbereit.", author: "Dario", position: "Teamkollege" },
    { id: 3, text: "Bringt großartige Energie in jedes Projekt.", author: "Eva", position: "Frontend-Entwicklerin" },
    { id: 4, text: "Sehr positiv und hilfsbereit.", author: "Damian", position: "Kollege" }
  ];

  translations = {
    en: {
      headline: 'What my colleagues say about me'
    },
    de: {
      headline: 'Das sagen meine Kolleg:innen über mich'
    }
  };

  visibleSlides: any[] = [];

  wrapperTransform = 'translateX(0%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  isAnimating = false;

  constructor(private translation: TranslationService) {}

  ngOnInit() {
    this.updateVisibleSlides();
    // this.translation.lang.effect(() => {
    //   this.updateVisibleSlides();
    // });
    this.langSub = this.translation.lang$.subscribe(() => {
      this.updateVisibleSlides(); // Bei Sprachwechsel automatisch neu berechnen!
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  // get t() {
  //   return this.translations[this.translation.lang()];
  // }
  get t() {
    return this.translations[this.translation.currentLang];
  }

  get slides() {
    // return this.translation.lang() === 'de' ? this.slidesDe : this.slidesEn;
    return this.translation.currentLang === 'de' ? this.slidesDe : this.slidesEn;
  }

  get currentSlideId() {
    return this.visibleSlides[2]?.id;
  }

  updateVisibleSlides() {
    // Zeige immer 5 Slides (2 vor, current, 2 nach)
    const arr = this.slides;
    const visible = 5;
    const half = Math.floor(visible / 2);
    const result = [];
    for (let i = 0; i < visible; i++) {
      let slideType = '';
      if (i === half) slideType = 'current';
      else if (i < half) slideType = `prev${half - i}`;
      else slideType = `next${i - half}`;
      result.push({
        ...arr[i % arr.length],
        slideType
      });
    }
    this.visibleSlides = result;
  }

  goPrev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(20%)'; // nach rechts animieren
  }

  goNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(-20%)';
  }

  onTransitionEnd() {
    if (!this.isAnimating) return;

    // Array-Rotation erst nach Animation!
    if (this.wrapperTransform === 'translateX(-20%)') { // Next
      if (this.slidesEn.length > 0) {
        const first = this.slidesEn.shift();
        if (first) this.slidesEn.push(first);
      }
      if (this.slidesDe.length > 0) {
        const first = this.slidesDe.shift();
        if (first) this.slidesDe.push(first);
      }
    } else if (this.wrapperTransform === 'translateX(20%)') { // Prev
      if (this.slidesEn.length > 0) {
        const last = this.slidesEn.pop();
        if (last) this.slidesEn.unshift(last);
      }
      if (this.slidesDe.length > 0) {
        const last = this.slidesDe.pop();
        if (last) this.slidesDe.unshift(last);
      }
    }

    // Wrapper sofort zurück zur Mittelposition (ohne Animation)
    this.transition = 'none';
    this.wrapperTransform = 'translateX(0%)';
    this.updateVisibleSlides();

    // Transition wieder aktivieren
    setTimeout(() => {
      this.transition = 'transform 0.3s cubic-bezier(.4,0,.2,1)';
      this.isAnimating = false;
    }, 20);
  }
}
