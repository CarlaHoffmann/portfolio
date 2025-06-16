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

  private _disabled = false;
  @Input() 
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.stopAnimation(true);
    }
  }
  get disabled() {
    return this._disabled;
  }

  borderColor = '#FFFFFF';
  textColor = '#FFFFFF'; 

  showStatic = true;
  showAnimated = false;

  staticStyle = this.getInitialStaticStyle();
  animatedStyle = this.getInitialAnimatedStyle();

  private duration = 2000; 
  private running = false;
  private timeout1: any;
  private timeout2: any;
  private timeout3: any;

  startAnimation() {
    if (this.disabled || this.running) return;
    this.running = true;
    this.setActiveColors();
    this.staticStyle = this.getHiddenStaticStyle();

    this.timeout1 = setTimeout(() => {
      this.showStatic = false;
      this.showAnimated = true;
      this.loopAnimated();
    }, 500);
  }

  private loopAnimated() {
    if (!this.running) return;
    this.animatedStyle = this.getInitialAnimatedStyle();

    setTimeout(() => {
      this.animatedStyle = this.getAnimatedLoopStyle();

      this.timeout2 = setTimeout(() => {
        if (this.running) {
          this.loopAnimated();
        }
      }, this.duration);
    }, 20);
  }

  stopAnimation(fromDisabled = false) {
    if (!this.running) return;
    this.running = false;
    this.clearAllTimeouts();
    this.resetColors();
    this.showStatic = true;
    this.showAnimated = false;
    this.staticStyle = this.getHiddenStaticStyle();

    setTimeout(() => {
      this.staticStyle = {
        transform: 'translateX(0%)',
        opacity: '1',
        transition: `transform 200ms linear, opacity 500ms linear`
      };
    }, 20);
  }

  private getInitialStaticStyle() {
    return {
      transform: 'translateX(0%)',
      opacity: '1',
      transition: 'none'
    };
  }

  private getHiddenStaticStyle() {
    return {
      transform: 'translateX(-100%)',
      opacity: '1',
      transition: `transform 500ms linear, opacity 500ms linear, color 500ms linear`
    };
  }

  private getInitialAnimatedStyle() {
    return {
      transform: 'translateX(100%)',
      opacity: '1',
      transition: 'none'
    };
  }

  private getAnimatedLoopStyle() {
    return {
      transform: 'translateX(-100%)',
      opacity: '1',
      transition: `transform ${this.duration}ms linear`
    };
  }

  private setActiveColors() {
    this.borderColor = '#3DCFB6';
    this.textColor = '#3DCFB6';
  }

  private resetColors() {
    this.borderColor = '#FFFFFF';
    this.textColor = '#FFFFFF';
  }

  private clearAllTimeouts() {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    clearTimeout(this.timeout3);
  }
}
