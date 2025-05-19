import { Routes } from '@angular/router';
import { ContactformComponent } from './contactform/contactform.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    // { path: '', component: MainPageComponent},
    // { path: '', component: MenuComponent},
    { path: '', component: HeaderComponent},
    // { path: '', component: ContactformComponent},
    // { path:'game/:id', component: GameComponent}
];
