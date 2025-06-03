import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectOverlayComponent } from '../project-overlay/project-overlay.component';
import { ProjectDataService, Project } from '../services/project-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectOverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[];
  isOverlayOpen = false;
  selectedProject: Project | null = null;
  selectedIndex: number | null = null;

  constructor(private projectDataService: ProjectDataService) {
    this.projects = this.projectDataService.getProjects();
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

  /** NEU: Öffnet das nächste Projekt, zyklisch */
  openNextProject() {
    if (this.projects.length === 0 || this.selectedIndex === null) return;
    const nextIndex = (this.selectedIndex + 1) % this.projects.length;
    this.selectedProject = this.projects[nextIndex];
    this.selectedIndex = nextIndex;
  }
}
