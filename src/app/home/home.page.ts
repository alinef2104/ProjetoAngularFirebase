import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  apiUrl = 'http://localhost:8000/api';
  token: string = '';
  posts: any[] = [];
  novaPostagem: any = { description: '', picture: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarPosts();
  }

  carregarPosts() {
    this.http.get(`${this.apiUrl}/posts`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe((res: any) => {
      this.posts = res; // já vem direto do Laravel
    });
  }

  criarPost() {
    if (!this.novaPostagem.description) return;
    const payload = {
      description: this.novaPostagem.description,
      picture: this.novaPostagem.picture || null
    };
    this.http.post(`${this.apiUrl}/posts/criar`, payload, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(() => {
      this.novaPostagem = { description: '', picture: '' };
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
