import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HeroService } from './hero.service';
import { HeroesRequestedDashboard, HeroActionTypes, HeroesLoaded, HeroActions, HeroRequested, HeroLoaded } from './hero.actions';
import { mergeMap, map } from 'rxjs/operators';


@Injectable()
export class HeroEffects {

  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType(
      HeroActionTypes.HeroesRequestedDashboard
      ,HeroActionTypes.HeroesRequestedHeroes),
    mergeMap(action => this.heroService.getHeroes()),
    map(heroes => new HeroesLoaded({heroes}))
  );

  @Effect()
  loadHero$ = this.actions$.pipe(
    ofType<HeroRequested>(HeroActionTypes.HeroRequested),
    mergeMap(action => this.heroService.getHero(action.payload.id)),
    map(hero => new HeroLoaded({hero}))
  );

  constructor(private actions$: Actions
    ,private heroService: HeroService){}
}
