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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}
