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

  // openProject(string: 'join' | 'pollo-loco' | 'ring-of-fire') {}
  openProject() {
  // openProject(project: string) {
    this.isOverlayOpen = true;
    document.body.style.overflow = 'hidden'; // Scrollen verhindern
  }
  
  closeOverlay() {
    this.isOverlayOpen = false;
    document.body.style.overflow = ''; // Scrollen wieder erlauben
  }
}
