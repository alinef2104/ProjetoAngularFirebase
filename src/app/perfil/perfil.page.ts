import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  apiUrl = 'http://localhost:8000/api';
  token: string = '';
  perfil: any = {};
  posts: any[] = [];
  novaPostagem: any = { description: '', picture: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarPerfil();
    this.carregarPosts();
  }

  carregarPerfil() {
    this.http.post(`${this.apiUrl}/usuario/perfil`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      this.perfil = res;
    });
  }

  carregarPosts() {
    this.http.get(`${this.apiUrl}/posts`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      this.posts = res.data || res;
    });
  }

  criarPost() {
    if (!this.novaPostagem.description) return;

    this.http.post(`${this.apiUrl}/posts/criar`, this.novaPostagem, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(() => {
      this.novaPostagem.description = '';
      this.carregarPosts();
    });
  }

  logout() {
    this.http.post(`${this.apiUrl}/usuario/logout`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
