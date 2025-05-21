import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PageComponentComponent } from '../page-component/page-component.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, PageComponentComponent, SkillsComponent, ProjectsComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
