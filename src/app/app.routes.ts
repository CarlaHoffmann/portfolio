import { Routes } from '@angular/router';
import { ContactformComponent } from './contactform/contactform.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent},
    // { path: '', component: ContactformComponent},
    { path:'contact', component: ContactformComponent},
    { path:'privacy-policy', component: PrivacyPolicyComponent}
];
