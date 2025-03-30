import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FAQComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: MainSectionComponent },
  { path: 'faq', component: FAQComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'search-page', component: SearchPageComponent } ,
  { path: 'manage-bookings', component: ManageBookingsComponent } ,
  { path: 'signup', component: SignupComponent }
];

