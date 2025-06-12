import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent {
  translation = inject(TranslationService);

  // slidesEn = [
  //   { id: 0, text: this.t.text00, author: "Anna", position: this.t.position00 },
  //   { id: 1, text: "", author: "Ben", position: "" },
  //   { id: 2, text: "", author: "Dario", position: "" },
  //   { id: 3, text: "", author: "Eva", position: "" },
  //   { id: 4, text: "", author: "Damian", position: "Partner" }
  // ];
  
  // slidesDe = [
  //   { id: 0, text: "", author: "Anna", position: "" },
  //   { id: 1, text: "", author: "Ben", position: "" },
  //   { id: 2, text: "", author: "Dario", position: "" },
  //   { id: 3, text: "", author: "Eva", position: "" },
  //   { id: 4, text: "", author: "Damian", position: "" }
  // ];
  // baseSlides = [
  //   { id: 0, text: this.t.text00, author: "Anna", position: this.t.position00 },
  //   { id: 1, text: this.t.text01, author: "Ben", position: this.t.position01 },
  //   { id: 2, text: this.t.text02, author: "Dario", position: this.t.position02 },
  //   { id: 3, text: this.t.text03, author: "Eva", position: this.t.position03 },
  //   { id: 4, text: this.t.text04, author: "Damian", position: this.t.position04 }
  // ];
  baseSlides = [
    { id: 0, author: "Anna" },
    { id: 1, author: "Ben" },
    { id: 2, author: "Dario" },
    { id: 3, author: "Eva" },
    { id: 4, author: "Damian" }
  ];

  translations = {
    en: {
      headline: 'What my colleagues say about me',
      text00: 'Carla is a fantastic team player!',
      text01: 'Her code quality is outstanding.',
      text02: 'Always positive and helpful..',
      text03: 'Brings great energy to every project.',
      text04: 'Most positive and helpful.',
      position00: 'Frontend Developer',
      position01: 'Team Partner',
      position02: 'Team Partner',
      position03: 'Frontend Developer',
      position04: 'Partner',
    },
    de: {
      headline: 'Das sagen meine Kolleg:innen über mich',
      text00: 'Carla ist eine fantastische Teamplayerin!',
      text01: 'Ihre Codequalität ist herausragend.',
      text02: 'Immer positiv und hilfsbereit.',
      text03: 'Bringt großartige Energie in jedes Projekt.',
      text04: 'Sehr positiv und hilfsbereit.',
      position00: 'Frontend-Entwicklerin',
      position01: 'Teamkollege',
      position02: 'Teamkollege',
      position03: 'Frontend-Entwicklerin',
      position04: 'Kollege',
    }
  };

  get t() {
    return this.translations[this.translation.lang()];
  }

  get slides() {
    // return this.translation.lang() === 'de' ? this.slidesDe : this.slidesEn;
    const t = this.t as Record<string, string>;
    return this.baseSlides.map((slide, i) => ({
      ...slide,
      text: t[`text0${i}`],
      position: t[`position0${i}`]
    }));
  }

  currentIndex = 0;
  slideDirection: 'left' | 'right' = 'right';

  wrapperTransform = 'translateX(0%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  isAnimating = false;
  visibleSlides: any[] = [];

  ngOnInit() {
    this.updateVisibleSlides();
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
    // if (this.wrapperTransform === 'translateX(-20%)') { // Next
    //   if (this.slidesEn.length > 0) {
    //     const first = this.slidesEn.shift();
    //     if (first) this.slidesEn.push(first);
    //   }
    //   if (this.slidesDe.length > 0) {
    //     const first = this.slidesDe.shift();
    //     if (first) this.slidesDe.push(first);
    //   }
    // } else if (this.wrapperTransform === 'translateX(20%)') { // Prev
    //   if (this.slidesEn.length > 0) {
    //     const last = this.slidesEn.pop();
    //     if (last) this.slidesEn.unshift(last);
    //   }
    //   if (this.slidesDe.length > 0) {
    //     const last = this.slidesDe.pop();
    //     if (last) this.slidesDe.unshift(last);
    //   }
    // }
    if (this.wrapperTransform === 'translateX(-20%)') { // Next
      if (this.baseSlides.length > 0) {
        const first = this.baseSlides.shift();
        if (first) this.baseSlides.push(first);
      }
    } else if (this.wrapperTransform === 'translateX(20%)') { // Prev
      if (this.baseSlides.length > 0) {
        const last = this.baseSlides.pop();
        if (last) this.baseSlides.unshift(last);
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
