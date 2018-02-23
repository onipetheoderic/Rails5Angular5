import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from '../models/movie';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
movies$: Observable<Movie[]>
private searchedSubject = new Subject<string>();
//a subject is both a source of Observable values and Observable itself. you can subscribe to a subject as well
  constructor(private movieService: MovieService) { }

  search(searchedString: string): void {
  	console.log(`searchedString = ${searchedString}`);
  	this.searchedSubject.next(searchedString);
  }

  ngOnInit() {
  	this.movies$ = this.searchedSubject.pipe(
  		debounceTime(300),
  		distinctUntilChanged(),
  		switchMap((searchedString: string) => this.movieService.searchMovie(searchedString))
  		);

  }

}
//the switchmap calll the search service for each search term that makes it throught the debounce and distinctUntilChanged
//it cancels and discards previous search observable returning only the latest search service observable