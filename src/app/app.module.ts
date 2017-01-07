import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {DataService} from '../providers/data-service';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {IntroductionPage} from '../pages/introduction/introduction';
import {TabsPage} from '../pages/tabs/tabs';
import {FlowerListPage} from '../pages/flower-list/flower-list';
import {FlowerImagesPage} from '../pages/flower-images/flower-images';
import {FlowerDetailsPage} from '../pages/flower-details/flower-details';
import {SearchPage} from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    IntroductionPage,
    TabsPage,
    FlowerListPage,
    FlowerImagesPage,
    FlowerDetailsPage,
    SearchPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    IntroductionPage,
    TabsPage,
    FlowerListPage,
    FlowerImagesPage,
    FlowerDetailsPage,
    SearchPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {
}
