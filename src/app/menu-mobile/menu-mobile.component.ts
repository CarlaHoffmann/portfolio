import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { LogoInitialsComponent } from "../logo-initials/logo-initials.component";

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [LogoInitialsComponent, LanguageSwitchComponent, LogoInitialsComponent],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}
