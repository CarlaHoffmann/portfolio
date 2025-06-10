import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { ReferenceComponent } from '../reference/reference.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, TestComponent, AboutMeComponent, SkillsComponent, 
    ProjectsComponent, ReferenceComponent, ContactComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
