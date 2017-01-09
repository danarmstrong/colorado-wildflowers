import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
import {DataService} from '../../providers/data-service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private criteria: any;
  private zones: any;
  private origins: any;

  constructor(private viewCtrl: ViewController, private navParams: NavParams,
              private dataService: DataService) {
    this.zones = dataService.getZones();
    this.origins = dataService.getOrigins();
    this.criteria = navParams.data;
    if (!this.criteria)
      this.resetCriteria();
  }

  resetCriteria() {
    this.criteria = {
      name: null,
      family: null,
      zone: null,
      altitude: null,
      bloom: null,
      origin: null
    };
  }

  search() {
    this.viewCtrl.dismiss(this.criteria);
  }

  cancel() {
    this.viewCtrl.dismiss({cancel: true});
  }
}
