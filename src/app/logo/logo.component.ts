import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(public navigation: NavigationService) {}

  // scrollHome() {
  //   if (this.router.url === '/') {
  //     // Bereits auf der Main-Page: smooth scroll to top
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   } else {
  //     // Navigiere zur Main-Page und scrolle nach oben, sobald Navigation fertig ist
  //     this.router.navigate(['/']).then(() => {
  //       window.scrollTo({ top: 0, behavior: 'smooth' });
  //     });
  //   }
  // }

  goHome() {
    this.navigation.goHome();
  }
}
