import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { InitiativeContainerComponent } from './components/initiative_container/initiative-container.component';
import { InitiativePageComponent } from './components/initiative-page/initiative-page.component';
import { PlayerMenuComponent } from './components/player-menu/player-menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InitiativeContainerComponent,
    InitiativePageComponent,
    PlayerMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: InitiativePageComponent, pathMatch: 'full' },
      { path: 'player-menu', component: PlayerMenuComponent }
    ]),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
