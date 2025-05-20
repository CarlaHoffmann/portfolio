import { Component } from '@angular/core';
import { TechComponent } from '../tech/tech.component';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SlideBtnComponent,TechComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
