import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/login.dto';
import { LoginResponse } from '../../responses/login.response';
import { TokenService } from '../../services/token.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  form: any = {
    email: null,
    password: null
  }; 

  constructor(private router: Router, private userService: UserService, 
              private tokenService: TokenService, private storageService: StorageService)
  { }

  ngOnInit(): void {
      if(this.tokenService.getToken() != null) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['login']);
      }
  }

  login() : void {

    const { email, password } = this.form;

    const loginDTO : LoginDTO = { email, password };
    // console.log(loginDTO);
    this.userService.login(loginDTO).subscribe({
      next: (response : any) => {
        this.tokenService.setToken(response.token);
        this.storageService.setUserInfo(response.user.email);
        
        console.log(this.storageService.getUserInfo());
        this.router.navigate(['']);
      },
      error(err : any) {
          alert(`Đăng nhập không thành công, Lỗi: ${err.error.message}`);
          console.log(err.error.message);
      }
    });
  }
}
