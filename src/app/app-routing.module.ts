import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppviewComponent } from './appview/appview.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppviewComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
