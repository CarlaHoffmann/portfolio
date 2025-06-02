import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss'
})
export class ProjectOverlayComponent {
  shakeGithub = false;
  shakeLiveTest = false;

  triggerShake(field: 'github' | 'live-test') {
    // Setze die Variable auf true, damit die Klasse gesetzt wird
    if (field === 'github') {
      this.shakeGithub = false;
      setTimeout(() => this.shakeGithub = true, 0);
      setTimeout(() => this.shakeGithub = false, 200); // Dauer der Animation
    }
    if (field === 'live-test') {
      this.shakeLiveTest = false;
      setTimeout(() => this.shakeLiveTest = true, 0);
      setTimeout(() => this.shakeLiveTest = false, 200);
    }
  }

  triggerOffShake(field: 'github' | 'live-test') {
    // Setze die Variable auf true, damit die Klasse gesetzt wird
    if (field === 'github') {
      this.shakeGithub = false;
      setTimeout(() => this.shakeGithub = true, 0);
      setTimeout(() => this.shakeGithub = false, 50); // Dauer der Animation
    }
    if (field === 'live-test') {
      this.shakeLiveTest = false;
      setTimeout(() => this.shakeLiveTest = true, 0);
      setTimeout(() => this.shakeLiveTest = false, 50);
    }
  }
}
