import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectOverlayComponent } from '../project-overlay/project-overlay.component';
import { ProjectDataService, Project } from '../services/project-data.service';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectOverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  isOverlayOpen = false;
  selectedProject: Project | null = null;
  selectedIndex: number | null = null;

  translations = {
    en: {
      portfolio: 'Portfolio',
      featuredProjects: 'Featured Projects',
      info: 'Explore a selection of my work here - Interact with <br />projects to see my skills in action.'
    },
    de: {
      portfolio: 'Portfolio',
      featuredProjects: 'Ausgewählte Projekte',
      info: 'Hier findest du eine Auswahl meiner Arbeiten – Interagiere mit den <br />Projekten, um meine Fähigkeiten in Aktion zu sehen.'
    }
  };

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  constructor(
    private projectDataService: ProjectDataService,
    private translation: TranslationService
  ) {
    this.projects = this.projectDataService.getProjects();
  }

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

  openProject(project: Project, index: number) {
    this.selectedProject = project;
    this.selectedIndex = index;
    this.isOverlayOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeOverlay() {
    this.isOverlayOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  openNextProject() {
    if (this.projects.length === 0 || this.selectedIndex === null) return;
    const nextIndex = (this.selectedIndex + 1) % this.projects.length;
    this.selectedProject = this.projects[nextIndex];
    this.selectedIndex = nextIndex;
  }
}
