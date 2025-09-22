import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  apiUrl = 'http://localhost:8000/api'; // URL da sua API Laravel

  usuario: any = { email: '', password: '', name: '', password_confirmation: '' };
  loginData: any = { email: '', password: '' };
  perfilData: any = {};
  
  posts: any[] = [];
  novaPostagem: any = { description: '', picture: '' };

  token: string = '';
  logado: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
      this.logado = true;
      this.carregarPerfil();
      this.carregarPosts();
    }
  }

  // Registrar usuário
  registrar() {
    this.http.post(`${this.apiUrl}/usuario/registrar-se`, this.usuario).subscribe((res: any) => {
      console.log('Registrado:', res);
      this.token = res.token;
      localStorage.setItem('token', this.token);
      this.logado = true;
      this.carregarPerfil();
      this.carregarPosts();
    });
  }

  // Login
  login() {
    this.http.post(`${this.apiUrl}/usuario/login`, this.loginData).subscribe((res: any) => {
      console.log('Logado:', res);
      this.token = res.token;
      localStorage.setItem('token', this.token);
      this.logado = true;
      this.carregarPerfil();
      this.carregarPosts();
    });
  }

  // Carregar perfil do usuário
  carregarPerfil() {
    this.http.post(`${this.apiUrl}/usuario/perfil`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      this.perfilData = res;
      console.log('Perfil:', res);
    });
  }

  // Carregar posts
  carregarPosts() {
    this.http.get(`${this.apiUrl}/posts`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      this.posts = res.data || res;
      console.log('Posts:', this.posts);
    });
  }

  // Criar nova postagem
  criarPost() {
    if (!this.novaPostagem.description) return;

    this.http.post(`${this.apiUrl}/posts/criar`, this.novaPostagem, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      console.log('Post criado:', res);
      this.novaPostagem = { description: '', picture: '' };
      this.carregarPosts();
    });
  }

  // Logout
  logout() {
    this.http.post(`${this.apiUrl}/usuario/logout`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(res => {
      console.log('Logout:', res);
      localStorage.removeItem('token');
      this.token = '';
      this.logado = false;
      this.perfilData = {};
      this.posts = [];
    });
  }

}
