import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
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
