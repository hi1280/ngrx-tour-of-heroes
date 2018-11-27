import { Action } from '@ngrx/store';
import { Hero } from './hero';

export enum HeroActionTypes {
  HeroesRequested = '[Dashboard Page] Heroes Requested',
  HeroesLoaded = '[Heroes API] Heroes Loaded'
}

export class HeroesRequested implements Action {
  readonly type = HeroActionTypes.HeroesRequested;
  
}

export class HeroesLoaded implements Action {
  readonly type = HeroActionTypes.HeroesLoaded;
  constructor(public payload: {heroes: Hero[]}){}
}

export type HeroActions = 
  HeroesRequested
  | HeroesLoaded;
