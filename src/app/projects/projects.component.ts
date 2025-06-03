import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectOverlayComponent } from '../project-overlay/project-overlay.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectOverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  isOverlayOpen = false;
  selectedProject: string | null = null;

  // openProject(project: 'join' | 'pollo-loco' | 'ring-of-fire') {
  openProject(project: string) {
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
