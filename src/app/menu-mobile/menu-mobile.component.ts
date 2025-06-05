import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [LogoComponent, LanguageSwitchComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {
  selectedLanguage: 'en' | 'de' = 'en';

  selectLanguage(lang: 'en' | 'de') {
    this.selectedLanguage = lang;
  }
}
