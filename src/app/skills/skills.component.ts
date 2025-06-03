import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { TechDataService, Technology } from '../services/tech-data.service';

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

  constructor(private techDataService: TechDataService) {
    this.technologies = this.techDataService.getTechnologies();
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
