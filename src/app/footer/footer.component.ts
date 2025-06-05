import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LogoInitialsComponent } from '../logo-initials/logo-initials.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, LogoInitialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
