import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { appRoutes } from './routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { HistoryGraphicComponent } from './history-graphic/history-graphic.component';
import { CircularComponent } from './circular/circular.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { CountryListComponent } from './country-list/country-list.component';
import { HomeComponent } from './home/home.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { AccountService } from './services/account.service';
import { LoginGuard } from './login/login.guard';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      TableInfoComponent,
      WorldMapComponent,
      HistoryGraphicComponent,
      CircularComponent,
      NavComponent,
      LoginComponent,
      CountryListComponent,
      HomeComponent,
      CountryDetailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [AccountService, LoginGuard, ApiService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
