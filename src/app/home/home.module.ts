import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { NavbarModule } from '../navbar/navbar.module'; // Navbar

@NgModule({
  imports: [
    CommonModule,        // ✅ necessário para pipes como date
    FormsModule,
    IonicModule,         // ✅ necessário para ion-*
    HomePageRoutingModule,
    NavbarModule         // ✅ Navbar
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
