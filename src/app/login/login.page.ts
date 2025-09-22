import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  apiUrl = 'http://localhost:8000/api';
  loginData: any = { email: '', password: '' };
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post(`${this.apiUrl}/usuario/login`, this.loginData)
      .subscribe((res: any) => {
        console.log('Logado:', res);
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/perfil']);
      }, err => {
        console.error(err);
        alert('Erro no login');
      });
  }
}
