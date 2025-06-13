import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, MenuMobileComponent, SlideBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
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
}
