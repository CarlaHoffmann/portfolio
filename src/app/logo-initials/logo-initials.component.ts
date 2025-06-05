import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-initials',
  standalone: true,
  imports: [],
  templateUrl: './logo-initials.component.html',
  styleUrl: './logo-initials.component.scss'
})
export class LogoInitialsComponent {
  constructor(private router: Router) {}

  scrollHome() {
    if (this.router.url === '/') {
      // Bereits auf der Main-Page: smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigiere zur Main-Page und scrolle nach oben, sobald Navigation fertig ist
      this.router.navigate(['/']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}
