import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroAdded, HeroDeleted, HeroesRequestedHeroes } from '../hero.actions';
import { HeroService } from '../hero.service';
import { AppState, selectHeroes } from '../reducers';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private store: Store<AppState>) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new HeroesRequestedHeroes());
    this.store.pipe(
      select(selectHeroes)
    )
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.store.dispatch(new HeroAdded({hero: {name} as Hero}));
    this.store.pipe(
      select(selectHeroes)
    )
    .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.store.dispatch(new HeroDeleted({hero}));
  }

}
