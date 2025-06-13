import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { LogoInitialsComponent } from "../logo-initials/logo-initials.component";
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [LogoInitialsComponent, LanguageSwitchComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent implements OnInit, OnDestroy {
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

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  constructor(private translation: TranslationService) {}

  ngOnInit() {
    this.langSub = this.translation.lang$.subscribe(lang => {
      this.lang = lang;
      this.t = this.translations[lang];
    });
    this.lang = this.translation.currentLang;
    this.t = this.translations[this.lang];
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  openMenu() {
    this.isMenuOpen = true;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}
