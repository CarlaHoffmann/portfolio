import { Component, inject } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, MenuMobileComponent, SlideBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  translation = inject(TranslationService);

  translations = {
    en: {
      frontendDev: 'Frontend Developer',
      checkMyWork: 'Check my work',
      contactMe: 'Contact me',
      openToWork: 'Open to work',
      availableRemote: 'Available for remote work',
      basedIn: 'Based in Chemnitz'
    },
    de: {
      frontendDev: 'Frontend-Entwicklerin',
      checkMyWork: 'Meine Projekte',
      contactMe: 'Kontakt',
      openToWork: 'Offen für neue Projekte',
      availableRemote: 'Verfügbar für Remote-Arbeit',
      basedIn: 'Standort Chemnitz'
    }
  };

  get t() {
    return this.translations[this.translation.lang()];
  }
}
