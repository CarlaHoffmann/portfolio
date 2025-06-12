import { Component, inject } from '@angular/core';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { LogoInitialsComponent } from "../logo-initials/logo-initials.component";
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [LogoInitialsComponent, LanguageSwitchComponent, LogoInitialsComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {
  translation = inject(TranslationService);
  isMenuOpen = false;

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

  openMenu() {
    this.isMenuOpen = true;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}
