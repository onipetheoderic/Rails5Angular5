import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



const routes: Routes = [
{ path: '', redirectTo: '/movies', pathMatch: 'full' },
{ path: 'movies', component: MoviesComponent },
{ path: 'detail/:id', component: MovieDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
