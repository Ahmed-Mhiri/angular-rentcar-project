import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { FAQComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { SignupComponent } from './signup/signup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PaymentComponent } from './purchase/payment/payment.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'faq', component: FAQComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'search-page', component: SearchPageComponent } ,
  { path: 'manage-bookings', component: ManageBookingsComponent } ,
  { path: 'signup', component: SignupComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'payment', component: PaymentComponent }
];

