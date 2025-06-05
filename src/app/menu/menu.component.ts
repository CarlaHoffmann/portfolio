import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [LogoComponent, LanguageSwitchComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  
}
