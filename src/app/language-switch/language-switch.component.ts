import { Component } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  selectedLanguage: 'en' | 'de' = 'en';

  selectLanguage(lang: 'en' | 'de') {
    this.selectedLanguage = lang;
  }
}
