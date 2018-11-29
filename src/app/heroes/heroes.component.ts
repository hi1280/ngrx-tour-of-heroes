import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectHeroes } from '../reducers';
import { HeroesRequestedHeroes, HeroAdded } from '../hero.actions';

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

    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
