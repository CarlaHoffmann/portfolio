import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-btn',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './slide-btn.component.html',
  styleUrl: './slide-btn.component.scss'
})
export class SlideBtnComponent {
  @Input() text = '';

  borderColor = '#FFFFFF';
  textColor = '#FFFFFF'; 

  showStatic = true;
  showAnimated = false;

  staticStyle = {
    transform: 'translateX(0%)',
    opacity: '1',
    transition: 'none'
  };

  animatedStyle = {
    transform: 'translateX(100%)',
    opacity: '1',
    transition: 'none'
  };

  private duration = 2000; // ms, Geschwindigkeit des Durchflugs
  private running = false;
  private timeout1: any;
  private timeout2: any;
  private timeout3: any;

  startAnimation() {
    if (this.running) return;
    this.running = true;

    this.borderColor = '#3DCFB6';
    this.textColor = '#3DCFB6';

    // 1. Statisches Element nach links raus
    this.staticStyle = {
      transform: 'translateX(-100%)',
      opacity: '0',
      transition: `transform 500ms linear, opacity 500ms linear, color 500ms linear`
    };

    this.timeout1 = setTimeout(() => {
      this.showStatic = false;
      this.showAnimated = true;
      this.loopAnimated();
    }, 500); // Zeit wie oben gewählt
  }

  private loopAnimated() {
    if (!this.running) return;

    // Von rechts nach links animieren
    this.animatedStyle = {
      transform: 'translateX(100%)',
      opacity: '1',
      transition: 'none'
    };

    // Kleines Timeout, damit der Browser das "none" registriert
    setTimeout(() => {
      this.animatedStyle = {
        transform: 'translateX(-100%)',
        opacity: '1',
        transition: `transform ${this.duration}ms linear`
      };

      // Nach der Animation sofort wieder von rechts starten
      this.timeout2 = setTimeout(() => {
        if (this.running) {
          this.loopAnimated();
        }
      }, this.duration);
    }, 20);
  }

  stopAnimation() {
    this.running = false;
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
    this.showStatic = true;
    this.showAnimated = false;

    this.borderColor = '#FFFFFF';
    this.textColor = '#FFFFFF';

    this.staticStyle = {
      transform: 'translateX(-100%)',
      opacity: '1',
      transition: 'none'
    };
    // this.animatedStyle = {
    //   transform: 'translateX(100%)',
    //   opacity: '1',
    //   transition: 'none'
    // };
    // Kurzes Timeout, damit Browser den Style registriert
    setTimeout(() => {
      this.staticStyle = {
        transform: 'translateX(0%)',
        opacity: '1',
        transition: `transform 500ms linear, opacity 500ms linear`
      };
    }, 20);
  }
}
