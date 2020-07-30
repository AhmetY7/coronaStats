import { LoginComponent } from './login/login.component';
import { CountryListComponent } from './country-list/country-list.component';
import { HomeComponent } from './home/home.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard'

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'countryList', component: CountryListComponent, canActivate:[LoginGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'countryDetail/:countryId', component: CountryDetailComponent, canActivate:[LoginGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
