import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, SlideBtnComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
