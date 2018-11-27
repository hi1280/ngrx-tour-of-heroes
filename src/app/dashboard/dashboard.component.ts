import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Store, select } from '@ngrx/store';
import { AppState, selectHeroes } from '../reducers';
import { HeroesRequested } from '../hero.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new HeroesRequested());

    this.store.pipe(
      select(selectHeroes)
    )
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
