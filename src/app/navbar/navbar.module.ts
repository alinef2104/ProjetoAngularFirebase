import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [NavbarComponent] // exporta para usar em outros módulos
})
export class NavbarModule {}
