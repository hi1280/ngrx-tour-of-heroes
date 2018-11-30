import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroRequested, HeroUpdated } from '../hero.actions';
import { HeroService } from '../hero.service';
import { AppState, selectHeroesById } from '../reducers';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new HeroRequested({id}));
    this.store.pipe(
      select(selectHeroesById(id))
    ).subscribe(hero => {
      this.hero = {...hero}
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const hero: Update<Hero> = {
      id: this.hero.id,
      changes: this.hero
    }
    this.store.dispatch(new HeroUpdated({hero}));
    this.goBack()
  }
}
