import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
