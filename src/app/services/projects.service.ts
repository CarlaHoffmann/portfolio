import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  image: string;
  technologies: string[];
  description: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  projects: Project[] = [
    {
      title: 'Join',
      image: './assets/img/join2.png',
      technologies: ['HTML', 'CSS', 'Firebase'],
      description: 'Projektbeschreibung ...',
      link: ''
    },
    // weitere Projekte ...
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}