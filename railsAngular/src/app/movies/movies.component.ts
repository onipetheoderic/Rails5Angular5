import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

	//after importing the Model, we must assign an Object to it
	movies: Movie[];
	//lets create the movie service
  constructor(private movieService: MovieService) { }
  getMoviesFromService(){
  	this.movieService.getMovies().subscribe(movieCollector => this.movies = movieCollector);
  }//we create an anonymouse callback function called movieCollector which get the results and return it to the 
  //movies array type object, which is equal to the anonymous function

  ngOnInit() {
  	this.getMoviesFromService();

  }

  add(name: string, releaseYear: string): void {
  	name = name.trim()
  	//lets convert the releaseYear to number by using the Number.isNaN to do it
  	if (Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0){
  		alert('Name must not be blank and ReleaseYear must be a number');
  		return;//return nothing
  	}
  	const newMovie: Movie = new Movie(); //we now create a new movie instance object
  	//we define the variable in the object to be equals to the incoming one from the template
  	newMovie.name = name;
  	newMovie.releaseYear = Number(releaseYear);
  	this.movieService.addMovie(newMovie).subscribe(insertedMovie => {this.movies.push(insertedMovie)});

  }

  delete(movieId: number): void {
  	this.movieService.deleteMovie(movieId).subscribe(_ => {
  		this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId)
  	});
  }


}
//npm install --save bootstrap