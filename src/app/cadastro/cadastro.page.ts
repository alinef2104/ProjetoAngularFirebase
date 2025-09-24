import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  apiUrl = 'http://localhost:8000/api';
  
  // 👉 dados do formulário de cadastro
  usuario: any = { 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  };

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    console.log('Enviando cadastro:', this.usuario);

    this.http.post(`${this.apiUrl}/usuario/registrar`, this.usuario)
      .subscribe((res: any) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']); // redireciona pro login
      }, err => {
        console.error('Erro no cadastro:', err);
        alert('Erro: ' + JSON.stringify(err.error)); // mostra o erro real do backend
      });
  }
}
