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

  constructor(private projectDataService: ProjectDataService) {
    this.projects = this.projectDataService.getProjects();
  }

  // openProject(project: 'join' | 'pollo-loco' | 'ring-of-fire') {
  openProject(project: Project) {
    console.log('open Overlay');
    this.selectedProject = project;
    this.isOverlayOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeOverlay() {
    console.log('Overlay closed in projects');
    this.isOverlayOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = '';
  }
}
