import { Routes } from '@angular/router';
import { ContactformComponent } from './contactform/contactform.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent},
    // { path:'contact', component: ContactformComponent},
    { path:'legal-notice', component: LegalNoticeComponent},
    { path:'privacy-policy', component: PrivacyPolicyComponent}
];
