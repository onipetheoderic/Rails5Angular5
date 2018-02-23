import { Component, OnInit, Input} from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';


//lets go and create the getMovieFromId method in the service
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

@Input() movie: Movie;//@Input is used to bind properties together between 2 component

  constructor(
  	private route: ActivatedRoute,
  	private movieService: MovieService,
  	private location: Location) { }
  //already the router we specified earlier has made the job easier for us, as it bring us to this page when each movie
  //is clicked

  getMovieFromRoute(){//this would inject the movie from the route
  	//we use the route parameter mapper to seperate the id from the route itself and store it in the const id variable
  	const id = +this.route.snapshot.paramMap.get('id');//the +sign will convert the string to number, just like parseInt in jquery
  	console.log(`this.routes.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`)

  	//lets now make use of the service which accepts the movie id as an Argument
//we now parse the variable to the getMovieFromId method in the service
  	this.movieService.getMovieFromId(id).subscribe(movie => this.movie = movie);
  	//the movie is the anonymous function storing the result from the getMovieFromId, we now subscribe it to itself
  	//this.movie is refering to the Input() movie object of type Movie which we created earlier on

  }

  goback(): void{
  	this.location.back();
  }

  save(): void {
  	this.movieService.updateMovie(this.movie).subscribe(() => this.goback());
  	//after saving it should go back to the homepage
  }

  ngOnInit() {
  	this.getMovieFromRoute();
  }

}
