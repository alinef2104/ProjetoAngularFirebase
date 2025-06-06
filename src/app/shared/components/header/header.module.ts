import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderModule
  ]
})
export class HeaderModule {

  side_menu: any = [
    {
      icon: 'home-outline',
      name: 'Página Inicial',
      selected: true
    },
    {
      icon: 'cube-outline',
      name: 'Produtos',
      selected: false
    },
    {
      icon: 'people-outline',
      name: 'Clientes',
      selected: false
    },
    {
      icon: 'call-online',
      name: 'Contatos',
      selected: false
    }
  ];

 }
