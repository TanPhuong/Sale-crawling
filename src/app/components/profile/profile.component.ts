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
    this.getUserByEmail();
  }

  getUserByEmail(): void {
    this.user = this.apollo.watchQuery({
      query: GET_USER_BY_EMAIL,
      variables: this.storageService.getUserInfo(),
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findUserByEmail);
        return result.data.findUserByEmail;
      })
    )
  }
}
