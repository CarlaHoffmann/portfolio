import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent implements OnInit, OnDestroy {

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

  lang: 'en' | 'de' = 'en';
  visibleSlides: any[] = [];
  slides: any[] = [];

  wrapperTransform = 'translateX(0%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  isAnimating = false;

  private langSub!: Subscription;

  constructor(private translation: TranslationService) {}

  ngOnInit() {
    this.langSub = this.translation.lang$.subscribe(lang => {
      this.lang = lang;
      this.slides = lang === 'de' ? this.slidesDe : this.slidesEn;
      this.updateVisibleSlides();
    });
    this.lang = this.translation.currentLang;
    this.slides = this.lang === 'de' ? this.slidesDe : this.slidesEn;
    this.updateVisibleSlides();
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  get t() {
    return this.translations[this.lang];
  }

  get currentSlideId() {
    return this.visibleSlides[2]?.id;
  }

  private getSlideType(index: number, half: number): string {
    if (index === half) return 'current';
    if (index < half) return `prev${half - index}`;
    return `next${index - half}`;
  }

  private buildVisibleSlides(arr: any[], visible: number): any[] {
    const half = Math.floor(visible / 2);
    return Array.from({ length: visible }, (_, i) => ({
      ...arr[i % arr.length],
      slideType: this.getSlideType(i, half)
    }));
  }

  updateVisibleSlides() {
    this.visibleSlides = this.buildVisibleSlides(this.slides, 5);
  }

  goPrev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(20%)'; 
  }

  goNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(-20%)';
  }

  private rotateSlides(direction: 'next' | 'prev') {
    if (direction === 'next') {
      const first = this.slides.shift();
      if (first) this.slides.push(first);
    } else if (direction === 'prev') {
      const last = this.slides.pop();
      if (last) this.slides.unshift(last);
    }
  }

  private resetAnimation() {
    this.transition = 'none';
    this.wrapperTransform = 'translateX(0%)';
    this.updateVisibleSlides();
    setTimeout(() => {
      this.transition = 'transform 0.3s cubic-bezier(.4,0,.2,1)';
      this.isAnimating = false;
    }, 20);
  }

  onTransitionEnd() {
    if (!this.isAnimating) return;
    if (this.wrapperTransform === 'translateX(-20%)') {
      this.rotateSlides('next');
    } else if (this.wrapperTransform === 'translateX(20%)') {
      this.rotateSlides('prev');
    }
    this.resetAnimation();
  }
}
