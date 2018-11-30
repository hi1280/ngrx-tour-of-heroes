import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Hero } from './hero';

export enum HeroActionTypes {
  HeroesRequestedDashboard = '[Dashboard Page] Heroes Requested',
  HeroesRequestedHeroes = '[Heroes Page] Heroes Requested',
  HeroesLoaded = '[Heroes API] Heroes Loaded',
  HeroRequested = '[Hero Page] Hero Requested',
  HeroLoaded = '[Heroes API] Hero Loaded',
  HeroAdded = '[Heroes Page] Hero Added',
  HeroUpdated = '[Hero Detail Page] Hero Updated',
  HeroDeleted = '[Heroes Page] Hero Deleted',
  HeroAddedSuccess= '[Heroes API] Hero Added Success',
  HeroesSearchRequested = '[Hero Search Page] Heroes Search Requested',
  HeroesSearchLoaded = '[Heroes API] Heroes Search Loaded'
}

export class HeroesRequestedDashboard implements Action {
  readonly type = HeroActionTypes.HeroesRequestedDashboard;
}

export class HeroesRequestedHeroes implements Action {
  readonly type = HeroActionTypes.HeroesRequestedHeroes;
}

export class HeroesLoaded implements Action {
  readonly type = HeroActionTypes.HeroesLoaded;
  constructor(public payload: {heroes: Hero[]}){}
}

export class HeroRequested implements Action {
  readonly type = HeroActionTypes.HeroRequested;
  constructor(public payload: {id: number}){}
}

export class HeroLoaded implements Action {
  readonly type = HeroActionTypes.HeroLoaded;
  constructor(public payload: {hero: Hero}){}
}

export class HeroAdded implements Action {
  readonly type = HeroActionTypes.HeroAdded;
  constructor(public payload: {hero: Hero}){}
}

export class HeroAddedSuccess implements Action {
  readonly type = HeroActionTypes.HeroAddedSuccess;
  constructor(public payload: {hero: Hero}){}
}

export class HeroUpdated implements Action {
  readonly type = HeroActionTypes.HeroUpdated;
  constructor(public payload: {hero: Update<Hero>}){}
}

export class HeroDeleted implements Action {
  readonly type = HeroActionTypes.HeroDeleted;
  constructor(public payload: {hero: Hero}){}
}

export class HeroesSearchRequested implements Action {
  readonly type = HeroActionTypes.HeroesSearchRequested;
  constructor(public payload: {term: string}){}
}

export class HeroesSearchLoaded implements Action {
  readonly type = HeroActionTypes.HeroesSearchLoaded;
  constructor(public payload: {heroes: Hero[]}){}
}

export type HeroActions = 
  HeroesRequestedDashboard
  | HeroesRequestedHeroes
  | HeroesLoaded
  | HeroRequested
  | HeroLoaded
  | HeroAdded
  | HeroAddedSuccess
  | HeroUpdated
  | HeroDeleted
  | HeroesSearchRequested
  | HeroesSearchLoaded;
