// import { Component, inject } from '@angular/core';
// import { TranslationService } from '../services/translation.service';

// @Component({
//   selector: 'app-language-switch',
//   standalone: true,
//   imports: [],
//   templateUrl: './language-switch.component.html',
//   styleUrl: './language-switch.component.scss'
// })
// export class LanguageSwitchComponent {
//   translation = inject(TranslationService);
//   selectedLanguage = this.translation.lang;

//   selectLanguage(lang: 'en' | 'de') {
//     this.translation.setLang(lang);
//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent implements OnInit, OnDestroy {
  lang: 'en' | 'de' = 'en';
  private langSub!: Subscription;

  constructor(private translation: TranslationService) {}

  ngOnInit() {
    this.langSub = this.translation.lang$.subscribe(lang => {
      this.lang = lang;
    });
    // Initial setzen
    this.lang = this.translation.currentLang;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  selectLanguage(lang: 'en' | 'de') {
    this.translation.setLang(lang);
  }
}
