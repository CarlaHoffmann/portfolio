import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit, OnDestroy {
  translations = {
    en: {
      whoIAm: 'Who I Am',
      aboutMe: 'About me',
      intro: "Hey there, I'm Carla! Coding excites me because it’s both logical and creative. I love bringing ideas to life and seeing results right away.",
      based: "I’m based in Chemnitz and prefer to stay here. I value the flexibility of remote work and am open to such opportunities, but I’m also happy to discuss other working models.",
      openMinded: "I’m eager to learn new technologies and keep my skills up to date. Open-mindedness and adaptability are important to me.",
      problemSolving: "I tackle challenges with analytical thinking, creativity, and persistence. I see every problem as a chance to learn and enjoy collaborating on efficient solutions.",
    },
    de: {
      whoIAm: 'Wer ich bin',
      aboutMe: 'Über mich',
      intro: "Hallo, ich bin Carla! Programmieren begeistert mich, weil es sowohl logisch als auch kreativ ist. Ich liebe es, Ideen zum Leben zu erwecken und sofort Ergebnisse zu sehen.",
      based: "Ich lebe in Chemnitz und möchte gerne hier bleiben. Die Flexibilität von Remote-Arbeit schätze ich sehr und bin offen für diese Möglichkeit, ich bespreche aber auch gerne andere Arbeitsmodelle.",
      openMinded: "Ich bin immer neugierig auf neue Technologien und halte meine Fähigkeiten gerne aktuell. Offenheit und Anpassungsfähigkeit sind mir wichtig.",
      problemSolving: "Herausforderungen gehe ich analytisch, kreativ und ausdauernd an. Jedes Problem ist für mich eine Lernchance und ich arbeite gern im Team an effizienten Lösungen.",
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