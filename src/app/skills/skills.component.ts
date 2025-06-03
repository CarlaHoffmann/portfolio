import { Component } from '@angular/core';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { TechDataService, Technology } from '../services/tech-data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SlideBtnComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  technologies: Technology[];

  constructor(private techDataService: TechDataService) {
      this.technologies = this.techDataService.getTechnologies();
    }
}
