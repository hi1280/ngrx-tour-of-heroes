import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { Hero } from '../hero';
import { HeroActions, HeroActionTypes } from '../hero.actions';

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export interface HeroState extends EntityState<Hero> {}
export interface SearchedHeroState extends EntityState<Hero> {}

export interface AppState {
  hero: HeroState,
  searchedHero: SearchedHeroState
}

export const reducers: ActionReducerMap<AppState> = {
  hero: heroReducer,
  searchedHero: searchedHeroReducer
};

export const initialHeroState: HeroState = adapter.getInitialState();
export const initialSearchedHeroState: SearchedHeroState = adapter.getInitialState();

export function heroReducer(state = initialHeroState, action: HeroActions): HeroState {
  switch (action.type) {
    case HeroActionTypes.HeroesLoaded:
      return adapter.addAll(action.payload.heroes, {...state});
    case HeroActionTypes.HeroLoaded:
    case HeroActionTypes.HeroAddedSuccess:
      return adapter.addOne(action.payload.hero, state);
    case HeroActionTypes.HeroUpdated:
      return adapter.updateOne(action.payload.hero, state);
    case HeroActionTypes.HeroDeleted:
      return adapter.removeOne(action.payload.hero.id, state);
    default:
      return state;
  }
}

export function searchedHeroReducer(state = initialSearchedHeroState, action: HeroActions): SearchedHeroState {
  switch (action.type) {
    case HeroActionTypes.HeroesSearchLoaded:
      return adapter.addAll(action.payload.heroes, {...state});
    default:
      return state;
  }
}

export const selectHeroState = (state: AppState) => state.hero;
export const selectHeroes = createSelector(selectHeroState, adapter.getSelectors().selectAll);
export const selectHeroesById = (id: number) => createSelector(
  selectHeroState,
  (state: HeroState)  => state.entities[id]);
export const selectSearchedHeroState = (state: AppState) => state.searchedHero;
export const selectSearchedHeroes = createSelector(selectSearchedHeroState, adapter.getSelectors().selectAll);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];