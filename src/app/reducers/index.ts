import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { Hero } from '../hero';
import { HeroActions, HeroActionTypes } from '../hero.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export interface HeroState extends EntityState<Hero> {}

export interface AppState {
  hero: HeroState
}

export const reducers: ActionReducerMap<AppState> = {
  hero: heroesReducer
};

export const initialHeroState: HeroState = adapter.getInitialState();

export function heroesReducer(state = initialHeroState, action: HeroActions): HeroState {
  switch (action.type) {
    case HeroActionTypes.HeroesLoaded:
      return adapter.addAll(action.payload.heroes, {...state})
    case HeroActionTypes.HeroLoaded:
      return adapter.addOne(action.payload.hero, state);
    default:
      return state;

  }
}

export const selectHeroState = (state: AppState) => state.hero;
export const selectHeroes = createSelector(selectHeroState, adapter.getSelectors().selectAll);
export const selectHeroesById = (id: number) => createSelector(
  selectHeroState,
  (state: HeroState)  => state.entities[id]);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];