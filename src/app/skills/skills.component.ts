import { Component } from '@angular/core';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SlideBtnComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
