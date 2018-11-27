import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HeroService } from './hero.service';
import { HeroesRequested, HeroActionTypes, HeroesLoaded } from './hero.actions';
import { mergeMap, map } from 'rxjs/operators';


@Injectable()
export class HeroEffects {

  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType<HeroesRequested>(HeroActionTypes.HeroesRequested),
    mergeMap(action => this.heroService.getHeroes()),
    map(heroes => new HeroesLoaded({heroes}))
  );

  constructor(private actions$: Actions
    ,private heroService: HeroService){}
}
