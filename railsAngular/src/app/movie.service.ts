import { Injectable } from '@angular/core';
import { Movie } from './models/movie';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';


const httpOptions = {
	headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable()
export class MovieService {

	private moviesUrl = "http://127.0.0.1:3000/movies";


  constructor(private http: HttpClient) { }

getMovies(): Observable<Movie[]> {
	return this.http.get<Movie[]>(this.moviesUrl).pipe(//the pipe transfers the output to the anonymous function called
		//recievedMovie, we now stringify it
	tap(recievedMovie => console.log(`Movies = ${JSON.stringify(recievedMovie)}`)),
	catchError(error => of([]))
		);
}

getMovieFromId(id: number): Observable<Movie> {// the server should respond with a single <Movie>, not Arrays of Movie
	//here we parse the id into the new url constant contruct
	const url = `${this.moviesUrl}/${id}`;
	//here we pass an Id to it, which is a number, then tell it get the new Url with the id, cuz we are no longer working
	//with the previous moviesUrl, here we are getting and parsing the Id of a single url
	return this.http.get<Movie>(url).pipe(
		tap(selectedMovie => console.log(JSON.stringify(selectedMovie))),
		catchError(error => of(new Movie()))
		);
}
//here we are returning any object to the server, becos it is going to be formatted to Json by the Content-type
updateMovie(movie: Movie): Observable<any> {
	//here we parse it to the Id we want to Update
	return this.http.put(`${this.moviesUrl}/${movie.id}`, movie, httpOptions ).pipe(
		tap(updatedMovie => console.log(JSON.stringify(updatedMovie))),
		catchError(error => of(new Movie()))
		);
}

addMovie(newMovie: Movie): Observable<Movie> {
	return this.http.post<Movie>(this.moviesUrl, newMovie, httpOptions).pipe(
		tap(updatedMovie => console.log(JSON.stringify(updatedMovie))),
		catchError(error => of(new Movie()))
		);
}

deleteMovie(movieId: number): Observable<Movie> {
	const url = `${this.moviesUrl}/${movieId}`;
	return this.http.delete<Movie>(url, httpOptions).pipe(
		tap(_ => console.log(`Deleted Movie with an Id of ${movieId}`)),
		catchError(error => of(null))
		);

}

searchMovie(typedString: string): Observable<Movie[]> {
	if(!typedString.trim()) {//if nothing is typed return an empty array
		return of([]);
	}
	return this.http.get<Movie[]>(`http://127.0.0.1:3000/movies/search?name=${typedString}`).pipe(
		tap(foundedMovies =>console.log(`foundedMovie = ${JSON.stringify(foundedMovies)}`)),
		catchError(error => of(null))
		);
}

}

/**THE getMovieFromId 
we first extract the id, specifying that it is a number,
we need recreate another URL with the id extracted, by parsing it to the end, with the help of interpolation
we then get the Movie Object from this new url
*/


/** Updating Record is a PUT request method, so the HttpClient.put method takes 3 parameters
1. The Url
2. The data to Update
3. Options

The Url is going to remain Unchanged, becos the webApi knows which hero to update by looking at the movies id

The WebApi expects a  special header in the Http save requestsa, the header is the HttpOptions content 
defined in the movie servie. It require an header, for it be able to save to the db. the header tells it that it is a 
Json Object by saying Content-type: Json
 */