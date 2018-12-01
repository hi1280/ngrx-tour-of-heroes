import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { HeroActionTypes, HeroAdded, HeroAddedSuccess, HeroDeleted, HeroesLoaded, HeroesSearchLoaded, HeroesSearchRequested, HeroLoaded, HeroRequested, HeroUpdated } from './hero.actions';
import { HeroService } from './hero.service';


@Injectable()
export class HeroEffects {

  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType(
      HeroActionTypes.HeroesRequestedDashboard
      ,HeroActionTypes.HeroesRequestedHeroes),
    mergeMap(() => this.heroService.getHeroes()),
    map(heroes => new HeroesLoaded({heroes}))
  );

  @Effect()
  loadHero$ = this.actions$.pipe(
    ofType<HeroRequested>(HeroActionTypes.HeroRequested),
    mergeMap(action => this.heroService.getHero(action.payload.id)),
    map(hero => new HeroLoaded({hero}))
  );

  @Effect()
  addHero$ = this.actions$.pipe(
    ofType<HeroAdded>(HeroActionTypes.HeroAdded),
    mergeMap(action => this.heroService.addHero(action.payload.hero)),
    map(hero => {
      return new HeroAddedSuccess({hero})
    })
  );

  @Effect({dispatch:false})
  updateHero$ = this.actions$.pipe(
    ofType<HeroUpdated>(HeroActionTypes.HeroUpdated),
    tap(action => this.heroService.updateHero(action.payload.hero.changes).subscribe())
  );

  @Effect({dispatch:false})
  deleteHero$ = this.actions$.pipe(
    ofType<HeroDeleted>(HeroActionTypes.HeroDeleted),
    tap(action => this.heroService.deleteHero(action.payload.hero).subscribe())
  );

  @Effect()
  searchHeroes$ = this.actions$.pipe(
    ofType<HeroesSearchRequested>(HeroActionTypes.HeroesSearchRequested),
    mergeMap(action => this.heroService.searchHeroes(action.payload.term)),
    map(heroes => new HeroesSearchLoaded({heroes}))
  );

  constructor(private actions$: Actions
    ,private heroService: HeroService){}
}
