import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, AlertController} from 'ionic-angular';
import {DataService} from '../../providers/data-service';
import {SearchPage} from '../search/search';
import {TabsPage} from '../tabs/tabs';

/*
 Generated class for the FlowerList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-flower-list',
  templateUrl: 'flower-list.html'
})
export class FlowerListPage {

  private pageSize: number;
  private maxPages: number;
  private page: number;

  private viewMode: string;
  private data: any;
  private viewData: any;
  private filtered: boolean;
  private searchCriteria: any;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private loadingCtrl: LoadingController, private modalCtrl: ModalController,
              private alertCtrl: AlertController, private dataService: DataService) {
    this.pageSize = 30;
    this.maxPages = 0;
    this.page = 0;

    this.filtered = false;
    this.viewMode = '0';
    this.searchCriteria = null;
    this.initializeData();

    if (navParams.get('searchCriteria')) {
      this.searchCriteria = navParams.get('searchCriteria');
      this.search(this.searchCriteria);
    }
  }

  initializeData() {
    this.filtered = false;
    this.data = this.dataService.getFlowers();
    this.viewData = [];

    this.page = 0;
    this.maxPages = Math.ceil(this.data.length > 0 ? this.data.length / this.pageSize : 0);
    this.loadPage(this.page);
  }

  loadPage(page: number) {
    if (this.maxPages === 0 || page > this.maxPages)
      return;
    let start = page * this.pageSize;
    let end = Math.min(start + this.pageSize, this.data.length);
    for (let i = start; i < end; ++i)
      this.viewData.push(this.data[i]);
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.loadPage(this.page);

    infiniteScroll.complete();

    /*setTimeout(() => {

    }, 200);*/
  }

  getImageSrc(src: string) {
    return 'assets/img/flowers/' + src;
  }

  getPrimaryTitle(flower: any) {
    switch (this.viewMode) {
      case '0':
        return flower.scientificName;
      case '1':
        return flower.commonName;
      case '2':
        return flower.scientificFamily;
      case '3':
        return flower.commonFamily;
    }
  }

  getSecondaryTitle(flower: any) {
    switch (this.viewMode) {
      case '0':
        return flower.commonName;
      case '1':
        return flower.scientificName;
      case '2':
        return flower.commonFamily;
      case '3':
        return flower.scientificFamily;
    }
  }

  getPrimaryLabel(flower: any) {
    switch (this.viewMode) {
      case '0':
        return flower.scientificFamily;
      case '1':
        return flower.scientificFamily;
      case '2':
        return flower.scientificName;
      case '3':
        return flower.scientificName;
    }
  }

  getSecondaryLabel(flower: any) {
    switch (this.viewMode) {
      case '0':
        return flower.commonFamily;
      case '1':
        return flower.commonFamily;
      case '2':
        return flower.commonName;
      case '3':
        return flower.commonName;
    }
  }

  openSearch() {
    let searchModal = this.modalCtrl.create(SearchPage, this.searchCriteria, {
      enableBackdropDismiss: false
    });
    searchModal.onDidDismiss(data => {
      if (data.cancel)
        return;

      this.searchCriteria = data;
      this.search(data);
    });
    searchModal.present();
  }

  resetData() {
    this.searchCriteria = null;
    this.initializeData();
  }

  private search(criteria: any) {

    this.viewData = [];
    this.data = this.dataService.getFlowers().filter(val => {
      if (criteria.name && criteria.name.length > 0) {
        if (!val.scientificName.toLowerCase().includes(criteria.name.toLowerCase()) && !val.commonName.toLowerCase().includes(criteria.name.toLowerCase()))
          return false;
      }

      if (criteria.family && criteria.family.length > 0) {
        if (!val.scientificFamily.toLowerCase().includes(criteria.family.toLowerCase()) && !val.commonFamily.toLowerCase().includes(criteria.family.toLowerCase()))
          return false;
      }

      if (criteria.zone) {
        if (!val.zones.includes(criteria.zone.toLowerCase()))
          return false;
      }

      if (criteria.altitude) {
        if (criteria.altitude < val.minAltitude || criteria.altitude > val.maxAltitude)
          return false;
      }

      if (criteria.bloom) {
        if (criteria.bloom < val.minBloom || criteria.bloom > val.maxBloom)
          return false;
      }

      if (criteria.origin) {
        if (!val.origin.toLowerCase().includes(criteria.origin.toLowerCase()))
          return false;
      }

      return val;
    });

    this.page = 0;
    this.maxPages = Math.ceil(this.data.length > 0 ? this.data.length / this.pageSize : 0);
    this.loadPage(this.page);

    this.filtered = true;
  }

  goToView(flower: any) {
    this.navCtrl.push(TabsPage, flower);
  }
}
