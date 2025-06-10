import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
  currentIndex = 0;
  direction: 'left' | 'right' | null = null;
  isAnimating = false;

  // Animationseinstellungen
  wrapperTransform = 'translateX(-100%)';
  transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';

  getIndex(i: number) {
    return (i + this.slides.length) % this.slides.length;
  }

  prev() {
    if (this.isAnimating) return;
    this.direction = 'left';
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(0%)'; // Nach rechts sliden
  }

  next() {
    if (this.isAnimating) return;
    this.direction = 'right';
    this.isAnimating = true;
    this.wrapperTransform = 'translateX(-200%)'; // Nach links sliden
  }

  onTransitionEnd() {
    if (!this.direction) return;
    // Nach der Animation: Index anpassen und Wrapper zurücksetzen
    if (this.direction === 'right') {
      this.currentIndex = this.getIndex(this.currentIndex + 1);
    } else if (this.direction === 'left') {
      this.currentIndex = this.getIndex(this.currentIndex - 1);
    }
    // Sofort zurück auf Mittelposition (ohne Animation)
    this.transition = 'none';
    this.wrapperTransform = 'translateX(-100%)';
    // Animation für nächste Aktion wieder aktivieren
    setTimeout(() => {
      this.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
      this.isAnimating = false;
      this.direction = null;
    });
  }
}
