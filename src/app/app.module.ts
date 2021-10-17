import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DataModule } from './data/data.module';
import { MatButtonModule } from '@angular/material/button';
import { IntroductionComponent } from './introduction/introduction.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppviewComponent } from './appview/appview.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, IntroductionComponent, HomepageComponent, AppviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatToolbarModule,
    MatIconModule,
    DataModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
