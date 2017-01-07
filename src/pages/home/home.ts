import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {IntroductionPage} from '../introduction/introduction';
import {FlowerListPage} from '../flower-list/flower-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToIntroduction() {
    this.navCtrl.push(IntroductionPage);
  }

  goToFlowerList() {
    this.navCtrl.push(FlowerListPage);
  }

}
