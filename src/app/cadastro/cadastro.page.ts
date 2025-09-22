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
  usuario: any = { name: '', email: '', password: '', password_confirmation: '' };

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    this.http.post(`${this.apiUrl}/usuario/registrar-se`, this.usuario)
      .subscribe((res: any) => {
        console.log('Registrado:', res);
        alert('Cadastro realizado! Agora faça login.');
        this.router.navigate(['/login']);
      }, err => {
        console.error(err);
        alert('Erro no cadastro');
      });
  }
}
