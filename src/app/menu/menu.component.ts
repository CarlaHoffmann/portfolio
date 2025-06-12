// import { Component, inject } from '@angular/core';
// import { LogoComponent } from '../logo/logo.component';
// import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
// import { TranslationService } from '../services/translation.service';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [LogoComponent, LanguageSwitchComponent],
//   templateUrl: './menu.component.html',
//   styleUrl: './menu.component.scss'
// })
// export class MenuComponent {
//   translation = inject(TranslationService);

//   translations = {
//     en: {
//       aboutMe: 'About me',
//       skills: 'Skills',
//       projects: 'Projects'
//     },
//     de: {
//       aboutMe: 'Über mich',
//       skills: 'Fähigkeiten',
//       projects: 'Projekte'
//     }
//   };

//   get t() {
//     return this.translations[this.translation.lang()];
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LogoComponent, LanguageSwitchComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  translations = {
    en: {
      aboutMe: 'About me',
      skills: 'Skills',
      projects: 'Projects'
    },
    de: {
      aboutMe: 'Über mich',
      skills: 'Fähigkeiten',
      projects: 'Projekte'
    }
  };

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  constructor(private translation: TranslationService) {}

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
}
