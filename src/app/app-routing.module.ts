import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { CitysearchComponent } from './components/citysearch/citysearch.component';
import { SignupComponent } from './pages/auth/signup/signup.component';

const routes: Route[] = [
  {
    path: '',
    component: WeatherComponent,
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: CitysearchComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
