import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs';
import { RoleDTO } from 'src/app/dtos/role.dto';
import { GET_ROLES, GET_ROLE_BY_ID } from 'src/app/graphql.operations';


@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrl: './admin-role.component.scss'
})
export class AdminRoleComponent implements OnInit {
    roles: any;
    showForm: boolean = false; 

    constructor(private apollo: Apollo) {}

    ngOnInit(): void {
      this.getRole();
      // this.getRoleByID(id);
    }

    getRole(): void {
      this.roles = this.apollo.watchQuery({
        query: GET_ROLES,
        fetchPolicy: 'cache-and-network'
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.findAllRole);
          return result.data.findAllRole;
        })
      )
    }

    getRoleByID(id: String): void {
      this.roles = this.apollo.watchQuery({
        query: GET_ROLE_BY_ID,
        variables: id,
        fetchPolicy: 'cache-and-network'
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.findRoleById);
          return result.data.findRoleById;
        })
      )
    }

    showFormDialog() {
      this.showForm = true;
    }

    submitForm() {
      this.showForm = false;
    }
}
