// import { Injectable } from '@angular/core';
// import { Router, NavigationStart, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class NavigationService {
//   private homeScrollY = 0;
//   private lastRoute = '';
//   private restoreHomeScroll = false;

//   constructor(private router: Router) {
//     this.router.events.pipe(
//       filter(event => event instanceof NavigationStart)
//     ).subscribe((event: NavigationStart) => {
//       const nextUrl = event.url;
//       const isHome = this.router.url === '/';
//       const toSpecial = nextUrl === '/legal-notice' || nextUrl === '/privacy-policy';
//       const fromSpecial = this.router.url === '/legal-notice' || this.router.url === '/privacy-policy';
//       const toHome = nextUrl === '/';

//       if (isHome && toSpecial) {
//         this.homeScrollY = window.scrollY;
//       }

//       // Merke, dass beim nächsten Laden der Hauptseite die Scroll-Position wiederhergestellt werden soll
//       if (fromSpecial && toHome) {
//         this.restoreHomeScroll = true;
//       } else {
//         this.restoreHomeScroll = false;
//       }

//       this.lastRoute = this.router.url;
//     });

//     // 2. Nach Navigation zu Sonderseite: immer nach oben scrollen
//     this.router.events.pipe(
//       filter(event => event instanceof NavigationEnd)
//     ).subscribe((event: NavigationEnd) => {
//       const toSpecial = this.router.url === '/legal-notice' || this.router.url === '/privacy-policy';
//       // const fromSpecial = this.lastRoute === '/legal-notice' || this.lastRoute === '/privacy-policy';
//       const toHome = this.router.url === '/';

      
//       if (toSpecial) {
//         setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
//       }
//       // 3. Nach Navigation zurück zur Hauptseite: Scroll-Position wiederherstellen
//       // if (this.router.url === '/' && (this.lastRoute === '/legal-notice' || this.lastRoute === '/privacy-policy')) {
//       //   setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
//       // }

//       // else if (this.router.url === '/' && fromSpecial) {
//       //   setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
//       // }

//       else if (toHome && this.restoreHomeScroll) {
//         setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
//         this.restoreHomeScroll = false; // Nur einmal wiederherstellen!
//       }
//     });
  
//   }

//   goHome() {
//     if (this.router.url === '/') {
//       this.router.navigate(['/']);
//       // Bleibe auf der Hauptseite, scrolle zur letzten bekannten Position
      
//     } else {
//       // Navigiere zur Hauptseite, das Scrollen wird im Event-Handler erledigt
//       // router.navigate(['/']);
//       setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private homeScrollY = 0;
  private lastRoute = '';
  private restoreHomeScroll = false;

  constructor(private router: Router) {
    // 1. Scroll-Position der Hauptseite speichern, wenn zu einer Sonderseite navigiert wird
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event) => {
      const navStart = event as NavigationStart;
      const nextUrl = navStart.url;
      const isHome = this.router.url === '/';
      const toSpecial = nextUrl === '/legal-notice' || nextUrl === '/privacy-policy';
      const fromSpecial = this.router.url === '/legal-notice' || this.router.url === '/privacy-policy';
      const toHome = nextUrl === '/';

      if (isHome && toSpecial) {
        this.homeScrollY = window.scrollY;
      }
      if (fromSpecial && toHome) {
        this.restoreHomeScroll = true;
      } else {
        this.restoreHomeScroll = false;
      }

      this.lastRoute = this.router.url;
    });

    // 2. Nach Navigation: Scrollen
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      // event ist jetzt NavigationEnd
      // Wir nutzen weiterhin this.router.url für die aktuelle URL
      const toSpecial = this.router.url === '/legal-notice' || this.router.url === '/privacy-policy';
      const toHome = this.router.url === '/';

      if (toSpecial) {
        setTimeout(() => window.scrollTo(0, 0), 50);
      } else 
      if (toHome && this.restoreHomeScroll) {
        setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
        this.restoreHomeScroll = false;
      }
    });
  }

  goHome() {
    if (this.router.url === '/') {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
    } else {
      this.router.navigate(['/']);
    }
  }
}