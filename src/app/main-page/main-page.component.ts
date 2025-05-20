import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
