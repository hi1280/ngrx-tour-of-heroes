import { Action } from '@ngrx/store';
import { Hero } from './hero';

export enum HeroActionTypes {
  HeroesRequestedDashboard = '[Dashboard Page] Heroes Requested',
  HeroesRequestedHeroes = '[Heroes Page] Heroes Requested',
  HeroesLoaded = '[Heroes API] Heroes Loaded',
  HeroRequested = '[Hero Page] Hero Requested',
  HeroLoaded = '[Hero API] Hero Loaded',
  HeroAdded = '[Hero API] Hero Added',
  HeroUpdated = '[Hero API] Hero Updated',
  HeroDeleted = '[Hero API] Hero Deleted',
  HeroSucceeded = '[Hero API] Hero Succeeded',
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

export class HeroSucceeded implements Action {
  readonly type = HeroActionTypes.HeroSucceeded;
  constructor(public payload: {hero: Hero}){}
}

export type HeroActions = 
  HeroesRequestedDashboard
  | HeroesLoaded
  | HeroesRequestedHeroes
  | HeroRequested
  | HeroLoaded
  | HeroAdded
  | HeroSucceeded;
