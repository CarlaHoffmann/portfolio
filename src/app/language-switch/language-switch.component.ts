import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  constructor(private translation: TranslationService) {}
  // translation = inject(TranslationService);
  // selectedLanguage = this.translation.lang;

  selectLanguage(lang: 'en' | 'de') {
    this.translation.setLang(lang);
  }

  get selectedLanguage(): 'en' | 'de' {
    return this.translation.currentLang;
  }
}
