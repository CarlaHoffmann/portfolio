import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LogoInitialsComponent } from '../logo-initials/logo-initials.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, LogoInitialsComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
