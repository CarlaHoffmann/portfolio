import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private homeScrollY = 0;
  private lastRoute = '';
  private restoreHomeScroll = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event) => this.handleNavigationStart(event as NavigationStart));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.handleNavigationEnd());
  }

  private isHome(url: string): boolean {
    return url === '/';
  }

  private isSpecial(url: string): boolean {
    return url === '/legal-notice' || url === '/privacy-policy';
  }

  private handleNavigationStart(event: NavigationStart) {
    const nextUrl = event.url;
    const isHome = this.isHome(this.router.url);
    const toSpecial = this.isSpecial(nextUrl);
    const fromSpecial = this.isSpecial(this.router.url);
    const toHome = this.isHome(nextUrl);

    if (isHome && toSpecial) {
      this.homeScrollY = window.scrollY;
    }
    this.restoreHomeScroll = fromSpecial && toHome;

    this.lastRoute = this.router.url;
  }

  private handleNavigationEnd() {
    const toSpecial = this.isSpecial(this.router.url);
    const toHome = this.isHome(this.router.url);

    if (toSpecial) {
      setTimeout(() => window.scrollTo(0, 0), 50);
    } else if (toHome && this.restoreHomeScroll) {
      setTimeout(() => window.scrollTo({ top: this.homeScrollY, behavior: 'auto' }), 0);
      this.restoreHomeScroll = false;
    }
  }

  goHome() {
    if (this.router.url === '/') {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 0);
    } else {
      this.router.navigate(['/']);
    }
  }
}