import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { HistoryGraphicComponent } from './history-graphic/history-graphic.component';
import { CircularComponent } from './circular/circular.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TableInfoComponent,
    WorldMapComponent,
    HistoryGraphicComponent,
    CircularComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
