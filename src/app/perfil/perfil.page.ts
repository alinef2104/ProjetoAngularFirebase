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
  }

  carregarPerfil() {
    this.http.get(`${this.apiUrl}/usuario/perfil`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    }).subscribe({
      next: (res: any) => {
        this.perfil = res;
        this.carregarPostsDoUsuario(this.perfil.id);
      },
      error: err => {
        console.error(err);
        this.logout();
      }
    });
  }

  carregarPostsDoUsuario(userId: number) {
    this.http.get(`${this.apiUrl}/posts`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    }).subscribe({
      next: (res: any) => {
        const todosPosts = res.data || res;
        this.posts = todosPosts.filter((post: any) => post.user && post.user.id === userId);
      },
      error: err => console.error(err)
    });
  }

  criarPost() {
    if (!this.novaPostagem.description) return;

    const payload = {
      description: this.novaPostagem.description,
      picture: this.novaPostagem.picture ? this.novaPostagem.picture : null
    };

    this.http.post(`${this.apiUrl}/posts/criar`, payload, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    }).subscribe(() => {
      this.novaPostagem.description = '';
      this.novaPostagem.picture = '';
      this.carregarPostsDoUsuario(this.perfil.id); // Recarrega somente os posts do usuário logado
    }, err => {
      console.error(err);
      alert('Erro ao postar');
    });
  }

  logout() {
    this.http.post(`${this.apiUrl}/usuario/logout`, {}, {
      headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` })
    }).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/cadastro']);
      },
      error: err => console.error(err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('picture', file);

    this.http.post(`${this.apiUrl}/usuario/foto-upload`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    }).subscribe({
      next: (res: any) => {
        this.perfil.picture = res.picture_url;
        alert('Foto atualizada com sucesso!');
      },
      error: err => {
        console.error(err);
        alert('Erro ao atualizar foto: ' + (err.error?.message || 'Tente novamente'));
      }
    });
  }

  }



