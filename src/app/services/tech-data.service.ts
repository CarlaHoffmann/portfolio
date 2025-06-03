import { Injectable } from '@angular/core';

export interface Technology {
    title: string;
    image: string;
    description: string;
}

@Injectable({
    providedIn: 'root',
})
export class TechDataService {
    constructor() {}

    technologies: Technology[] = [
        {
            title: 'HTML',
            image: './assets/tech-icons/html.svg',
            description: '',
        },
        {
            title: 'CSS',
            image: './assets/tech-icons/css.svg',
            description: '',
        },
        {
            title: 'JavaScript',
            image: './assets/tech-icons/js.svg',
            description: '',
        },
        {
            title: 'Material Design',
            image: './assets/tech-icons/material-design.svg',
            description: '',
        },
        {
            title: 'TypeScript',
            image: './assets/tech-icons/ts.svg',
            description: '',
        },
        {
            title: 'Angular',
            image: './assets/tech-icons/angular.svg',
            description: '',
        },
        {
            title: 'Firebase',
            image: './assets/tech-icons/firebase.svg',
            description: '',
        },
        {
            title: 'GIT',
            image: './assets/tech-icons/git.svg',
            description: '',
        },
        {
            title: 'Rest-Api',
            image: './assets/tech-icons/rest-api.svg',
            description: '',
        },
        {
            title: 'Scrum',
            image: './assets/tech-icons/scrum.svg',
            description: '',
        },
        {
            title: 'Growth mindset',
            image: './assets/tech-icons/growth.svg',
            description: 'I have a special interes in learning',
        },
    ];

    getTechnologies(): Technology[] {
        return this.technologies;
    }
}
