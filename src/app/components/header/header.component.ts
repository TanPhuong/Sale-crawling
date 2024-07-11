import { Component, OnInit } from '@angular/core';
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
  isLogin: boolean = false;
  isAdmin: boolean = false; 

  showUserMenu: boolean = false;
  showAdminMenu: boolean = false;

  constructor(private token: TokenService, private storage: StorageService, private apollo: Apollo) {}

  ngOnInit(): void {
      if(this.IsLogin()) {
        this.isLogin = true;
        const email = this.storage.getUserInfo(); 
        const {id, fullName, phoneNumb, role} =  this.getInfo(email);
        if(this.checkAdmin(role.name)) {
          this.isAdmin = true; 
        }
      }
  }

  IsLogin(): boolean {
    if(this.token.getToken()) {
      return true; 
    }
    return false; 
  }

  getInfo(email: String): any {
    this.user = this.apollo.watchQuery({
      query: GET_USER_BY_EMAIL,
      variables: email
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findUserByEmail);
        return result.data.findUserByEmail;
      })
    )
  }

  checkAdmin(role: String): boolean {
    if(role == "Admin") {
      return true;
    } 
    return false;
  }

}
