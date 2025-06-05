import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, MenuMobileComponent, SlideBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
