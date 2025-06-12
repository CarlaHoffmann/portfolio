// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
// import { Project } from '../services/project-data.service';
// import { TechDataService, Technology } from '../services/tech-data.service';
// import { TranslationService } from '../services/translation.service';

// @Component({
//   selector: 'app-project-overlay',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './project-overlay.component.html',
//   styleUrl: './project-overlay.component.scss'
// })
// export class ProjectOverlayComponent {
//   shakeGithub = false;
//   shakeLiveTest = false;
//   translation = inject(TranslationService);

//   @Input() project!: Project;
//   @Input() index!: number | null;
//   @Output() close = new EventEmitter<void>();
//   @Output() next = new EventEmitter<void>();

//   constructor(public techDataService: TechDataService) {}

//   translations = {
//     en: {
//       whatIsThis: 'What is this project about?',
//       nextProject: 'Next project'
//     },
//     de: {
//       whatIsThis: 'Worum geht es in diesem Projekt?',
//       nextProject: 'Nächstes Projekt'
//     }
//   };

//   get t() {
//     return this.translations[this.translation.lang()];
//   }

//   getTechByTitle(title: string): Technology | undefined {
//     return this.techDataService.technologies.find(tech => tech.title === title);
//   }

//   closeOverlay() {
//     this.close.emit();
//     document.body.style.overflow = '';
//   }

//   triggerShake(field: 'github' | 'live-test') {
//     // Setze die Variable auf true, damit die Klasse gesetzt wird
//     if (field === 'github') {
//       this.shakeGithub = false;
//       setTimeout(() => this.shakeGithub = true, 0);
//       setTimeout(() => this.shakeGithub = false, 200); // Dauer der Animation
//     }
//     if (field === 'live-test') {
//       this.shakeLiveTest = false;
//       setTimeout(() => this.shakeLiveTest = true, 0);
//       setTimeout(() => this.shakeLiveTest = false, 200);
//     }
//   }

//   triggerOffShake(field: 'github' | 'live-test') {
//     // Setze die Variable auf true, damit die Klasse gesetzt wird
//     if (field === 'github') {
//       this.shakeGithub = false;
//       setTimeout(() => this.shakeGithub = true, 0);
//       setTimeout(() => this.shakeGithub = false, 50); // Dauer der Animation
//     }
//     if (field === 'live-test') {
//       this.shakeLiveTest = false;
//       setTimeout(() => this.shakeLiveTest = true, 0);
//       setTimeout(() => this.shakeLiveTest = false, 50);
//     }
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../services/project-data.service';
import { TechDataService, Technology } from '../services/tech-data.service';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss'
})
export class ProjectOverlayComponent implements OnInit, OnDestroy {
  shakeGithub = false;
  shakeLiveTest = false;

  @Input() project!: Project;
  @Input() index!: number | null;
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  translations = {
    en: {
      whatIsThis: 'What is this project about?',
      nextProject: 'Next project'
    },
    de: {
      whatIsThis: 'Worum geht es in diesem Projekt?',
      nextProject: 'Nächstes Projekt'
    }
  };

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  constructor(
    public techDataService: TechDataService,
    private translation: TranslationService
  ) {}

  ngOnInit() {
    this.langSub = this.translation.lang$.subscribe(lang => {
      this.lang = lang;
      this.t = this.translations[lang];
    });
    // Initial setzen
    this.lang = this.translation.currentLang;
    this.t = this.translations[this.lang];
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  getTechByTitle(title: string): Technology | undefined {
    return this.techDataService.technologies.find(tech => tech.title === title);
  }

  closeOverlay() {
    this.close.emit();
    document.body.style.overflow = '';
  }

  triggerShake(field: 'github' | 'live-test') {
    if (field === 'github') {
      this.shakeGithub = false;
      setTimeout(() => this.shakeGithub = true, 0);
      setTimeout(() => this.shakeGithub = false, 200);
    }
    if (field === 'live-test') {
      this.shakeLiveTest = false;
      setTimeout(() => this.shakeLiveTest = true, 0);
      setTimeout(() => this.shakeLiveTest = false, 200);
    }
  }

  triggerOffShake(field: 'github' | 'live-test') {
    if (field === 'github') {
      this.shakeGithub = false;
      setTimeout(() => this.shakeGithub = true, 0);
      setTimeout(() => this.shakeGithub = false, 50);
    }
    if (field === 'live-test') {
      this.shakeLiveTest = false;
      setTimeout(() => this.shakeLiveTest = true, 0);
      setTimeout(() => this.shakeLiveTest = false, 50);
    }
  }
}
