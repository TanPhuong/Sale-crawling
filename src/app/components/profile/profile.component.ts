import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_USER_BY_EMAIL } from 'src/app/graphql.operations';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  user: any;

  constructor(private apollo: Apollo, private storageService: StorageService) {}

  
  ngOnInit(): void {
    const email = this.storageService.getUserInfo();
    this.getUserByEmail(email);
  }

  getUserByEmail(email: String): any {
    return this.apollo.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
    })
    .subscribe((result: any) => {
      console.log(result.data.findUserByEmail)
      
      this.user = result.data.findUserByEmail
    })
  }
}
