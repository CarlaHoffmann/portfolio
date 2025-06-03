import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  image: string;
  technologies: string[];
  description: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectDataService {
  constructor() {}

  projects: Project[] = [
    {
      title: 'Join',
      image: './assets/img/join2.png',
      technologies: ['HTML', 'CSS', 'Firebase'],
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories',
      link: '',
    },
    {
      title: 'El Pollo Loco',
      image: './assets/img/pollo-loco.png',
      technologies: ['HTML', 'CSS', 'Firebase'],
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen',
      link: '',
    },
    {
      title: 'Ring of Fire',
      image: './assets/img/ringoffire3.png',
      technologies: ['HTML', 'SCSS', 'TypeScript'],
      description: 'Projektbeschreibung ...',
      link: '',
    },
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
