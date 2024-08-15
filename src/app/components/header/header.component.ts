import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_USER_BY_EMAIL } from 'src/app/graphql.operations';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: any;
  currentRole: any;
  isLogin: boolean = false;
  isAdmin: boolean = false; 

  showUserMenu: boolean = false;
  showAdminMenu: boolean = false;

  constructor(private router: Router, private token: TokenService, private storage: StorageService, private apollo: Apollo) {}

  ngOnInit(): void {
      if(this.IsLogin()) {
        this.isLogin = true;
        const email = this.storage.getUserInfo(); 
        console.log(email);

        this.getInfo(email);
      }
  }

  IsLogin(): boolean {
    if(this.token.getToken()) {
      return true; 
    }
    return false; 
  }

  getInfo(email: String): any {
    return this.apollo.query({
      query: GET_USER_BY_EMAIL,
      variables: { email }
    }).subscribe((result: any) => {
      console.log(result.data.findUserByEmail.role)
      
      this.user = result.data.findUserByEmail
      this.currentRole = result.data.findUserByEmail.role.name;
      
      if(this.checkAdmin(this.currentRole)) {
        this.isAdmin = true; 
        console.log("True")
      }
    })
  }

  checkAdmin(role: String): boolean {
    if(role == "Admin") {
      return true;
    } 
    return false;
  }

  logOut(): void {
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
