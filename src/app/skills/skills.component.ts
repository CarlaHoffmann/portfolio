import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { TechDataService, Technology } from '../services/tech-data.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SlideBtnComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  technologies: Technology[];
  // activeDescription: string | null = null;
  activeTech: Technology | null = null;
  translation = inject(TranslationService);

  constructor(private techDataService: TechDataService) {
    this.technologies = this.techDataService.getTechnologies();
  }

  translations = {
    en: {
      technologies: 'Technologies',
      skillSet: 'Skill Set',
      intro: `I have hands-on experience with a variety of front-end technologies, including HTML, CSS, JavaScript, and frameworks like Angular. I am always eager to learn and adapt to new tools and approaches, as I know how quickly web development evolves. Staying up to date with the latest trends and best practices is essential to me, and I enjoy continuously expanding my skill set to create modern, user-friendly web applications.`,
      needAnotherSkill: 'You need <span class="green">another skill?</span>',
      expandSkills: `Feel free to contact me. I’m looking forward to expanding my skills further.`,
      letsTalk: `Let's Talk`
    },
    de: {
      technologies: 'Technologien',
      skillSet: 'Fähigkeiten',
      intro: `Ich habe praktische Erfahrung mit verschiedenen Frontend-Technologien wie HTML, CSS, JavaScript und Frameworks wie Angular. Ich lerne gerne dazu und passe mich neuen Tools und Ansätzen an, denn die Webentwicklung entwickelt sich ständig weiter. Es ist mir wichtig, immer auf dem neuesten Stand zu bleiben und mein Wissen kontinuierlich zu erweitern, um moderne und benutzerfreundliche Webanwendungen zu entwickeln.`,
      needAnotherSkill: 'Du brauchst <span class="green">eine andere Fähigkeit?</span>',
      expandSkills: `Melde dich gerne bei mir. Ich freue mich darauf, mein Wissen weiter auszubauen.`,
      letsTalk: `Lass uns sprechen`
    }
  };

  get t() {
    return this.translations[this.translation.lang()];
  }

  // showDescription(tech: Technology) { 
  //   if (tech.description) {
  //     this.activeDescription = tech.description;
  //   }
  // }
  showDescription(tech: Technology) {
    if (tech.description) {
      this.activeTech = tech;
    }
  }

  hideDescription() { 
    // this.activeDescription = null;
    this.activeTech = null;
  }
}
