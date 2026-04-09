import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  image: string;
  technologies: string[];
  description: {
    en: string;
    de: string;
  };
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
      description: {
        en: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories',
        de: 'Aufgabenmanager inspiriert vom Kanban-System. Erstellen und organisieren Sie Aufgaben mit Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu'
      },
      github: 'https://github.com/CarlaHoffmann/Join',
      link: 'https://carla-hoffmann.net/join/logIn.html',
    },
    {
      title: 'El Pollo Loco',
      image: './assets/img/pollo2.JPG',
      technologies: ['HTML', 'CSS', 'Firebase'],
      description: {
        en: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
        de: 'Springen, laufen und werfen Spiel basierend auf objektorientiertem Ansatz. Hilf Pepe Münzen und Tabasco-Salsa zu finden, um gegen das verrückte Huhn zu kämpfen'
      },
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
    {
      title: 'DABubble',
      image: './assets/img/dabubble.png',
      technologies: ['HTML', 'CSS', 'Firebase', 'TypeScript'],
      description: {
        en: 'Modern messaging application for efficient team communication. Real-time messaging, group chats, and user management for seamless collaboration with colleagues.',
        de: 'Moderne Messaging-Anwendung für effiziente Teamkommunikation. Echtzeit-Nachrichten, Gruppenchats und Benutzerverwaltung für nahtlose Zusammenarbeit mit Kollegen.'
      },
      github: 'https://github.com/CarlaHoffmann/dabubble',
      link: 'https://carla-hoffmann.net/dabubble/',
    },
  ];

  getProjects(): Project[] {
    return this.projects;
  }
}
