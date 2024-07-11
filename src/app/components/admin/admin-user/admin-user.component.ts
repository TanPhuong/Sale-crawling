import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_USERS } from 'src/app/graphql.operations';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent implements OnInit {
    users: any;

    constructor(private apollo: Apollo) {}

    ngOnInit(): void {
        this.users = this.apollo.watchQuery({
          query: GET_USERS
        })
        .valueChanges.pipe(
          map((result: any) => {
            console.log(result.data.findAllUser);
            return result.data.findAllUser;
          })
        )
    }
}
