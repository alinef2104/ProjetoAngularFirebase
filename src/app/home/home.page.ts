import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  perfil: any = {
    foto: null,
    nome: null,
    profissao: null,
    nome_usuario: null,
    idioma: null,
    localidade: null,
    data_inicio: null,
    biografia: null,
    estatisticas: {
      curtidas: 0,
      seguindo: 0,
      amigos:0
    },
    postagens: [
      {
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3bEhwkj1DdbOYY4og0PHCnTmg73ApP0dEA&s',
        nome:'Billie Elish',
        nome_usuario:'@billieelish',
        texto: 'lorem',
        data: '12/03/2025'
      },

      {
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3bEhwkj1DdbOYY4og0PHCnTmg73ApP0dEA&s',
        nome:'Billie Elish',
        nome_usuario:'@billieelish',
        texto: 'outro post',
        data: '12/03/2025'
      }
    ]

  }

  constructor( ){ }

}
