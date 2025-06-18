import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  image: string;
  technologies: string[];
  description: string;
  github: string;
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
      github: 'https://github.com/CarlaHoffmann/Join',
      link: 'https://carla-hoffmann.net/join/logIn.html',
    },
    {
      title: 'El Pollo Loco',
      image: './assets/img/pollo2.JPG',
      technologies: ['HTML', 'CSS', 'Firebase'],
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen',
      github: 'https://github.com/CarlaHoffmann/El-pollo-loco',
      link: 'https://carla-hoffmann.net/pollo-loco/index.html',
    },
    // {
    //   title: 'Ring of Fire',
    //   image: './assets/img/ringoffire3.png',
    //   technologies: ['HTML', 'CSS', 'Firebase', 'TypeScript'],
    //   description: 'A card game to play and drink with friends.',
    //   github: 'https://github.com/CarlaHoffmann/ringoffire-firebase',
    //   link: 'https://carla-hoffmann.net/ring-of-fire/index.html',
    // },
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
