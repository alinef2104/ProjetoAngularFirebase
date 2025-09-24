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
  this.http.get(`${this.apiUrl}/usuario/perfil`, {
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
  
    // Garantir que picture seja null se vazio
    const payload = {
      description: this.novaPostagem.description,
      picture: this.novaPostagem.picture ? this.novaPostagem.picture : null
    };
  
    this.http.post(`${this.apiUrl}/posts/criar`, payload, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(() => {
      this.novaPostagem.description = '';
      this.novaPostagem.picture = '';
      this.carregarPosts(); // recarrega feed
    }, err => {
      console.error(err);
      alert('Erro ao postar');
    });
  }
  

  logout() {
    this.http.post(`${this.apiUrl}/usuario/logout`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/cadastro']);
    });
  }


  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('picture', file);

  this.http.post(`${this.apiUrl}/usuario/foto-upload`, formData, {
    headers: new HttpHeaders({ 
      'Authorization': `Bearer ${this.token}` 
    })
  }).subscribe((res: any) => {
    this.perfil.picture = res.picture_url; // chave correta do backend
    alert('Foto atualizada com sucesso!');
  }, err => {
    console.error(err);
    alert('Erro ao atualizar foto');
  });

}

}
