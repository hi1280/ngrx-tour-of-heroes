import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { Hero } from '../hero';
import { HeroActions, HeroActionTypes } from '../hero.actions';
import { ActivationEnd } from '@angular/router';

type HeroState = {
  heroes: Hero[]
}

export interface AppState {
  hero: HeroState
}

export const reducers: ActionReducerMap<AppState> = {
  hero: heroesReducer
};

export const initialHeroState: HeroState = {
  heroes: []
}

export function heroesReducer(state = initialHeroState, action: HeroActions): HeroState {
  switch (action.type) {
    case HeroActionTypes.HeroesLoaded:
      return {
        heroes: action.payload.heroes
      }
    default:
      return state;

  }
}

export const selectHeroState = (state: AppState) => state.hero;
export const selectHeroes = createSelector(selectHeroState, (state: HeroState) => state.heroes);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];