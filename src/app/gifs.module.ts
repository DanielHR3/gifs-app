import { CardComponent } from './gifs/components/card/card.component';
import { CardListComponent } from './gifs/components/card-list/card-list.component';


import { CommonModule } from '@angular/common';
import { HomePageComponent } from './gifs/pages/home/home-page.component';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './gifs/components/search-box/search-box.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    HomePageComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent,

  ],
})
export class GifsModule {}
