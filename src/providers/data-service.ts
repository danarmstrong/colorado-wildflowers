import { Injectable } from '@angular/core';
import flowers from '../assets/data/flowers.json';
import zones from '../assets/data/zones.json';
import origins from '../assets/data/origins.json';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  private flowers: any;
  private zones: any;
  private origins: any;

  constructor() {
    this.flowers = flowers;
    this.zones = zones;
    this.origins = origins;
  }

  getFlowers() {
    return this.flowers;
  }

  getZones() {
    return this.zones;
  }

  getOrigins() {
    return this.origins;
  }
}
