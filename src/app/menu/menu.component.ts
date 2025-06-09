import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LogoComponent, LanguageSwitchComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  translation = inject(TranslationService);

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

  get t() {
    return this.translations[this.translation.lang()];
  }
}
