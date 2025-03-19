import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: any = {
    email: null,
    password: null,
    corfirm_password: null
  }

  constructor(
    private message: MessageService,
    private crudServise: CrudService
  ) { }

  ngOnInit() {
  }

  registrar(){
    if (this.user.password != this.user.corfirm_password){
      this.message.show('As senhas não conferem', 3000);
      return;
    }

    this.crudServise.insert(this.user, 'user');
  }

}
