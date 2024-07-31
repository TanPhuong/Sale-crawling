import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs';
import { RoleDTO } from 'src/app/dtos/role.dto';
import { CREATE_ROLES, DELETE_ROLES, GET_ROLES, GET_ROLE_BY_ID, UPDATE_ROLES } from 'src/app/graphql.operations';


@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrl: './admin-role.component.scss'
})
export class AdminRoleComponent implements OnInit {
    roles: any;
    showForm: boolean = false; 
    showFormUpdate: boolean = false;
    selectedRole: any;

    newRole: any; 

    constructor(private apollo: Apollo) {}

    ngOnInit(): void {
      this.getRole();
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

    createRole(): void {
      this.apollo.mutate({
        mutation: CREATE_ROLES,
        refetchQueries: [{ query: GET_ROLES }],
        variables: {
          name: this.newRole
        }
      }).subscribe(() => {
        console.log("Tạo mới thành công")
        alert("Tạo mới thành công")
      })
    }

    updateRole(name: String): void {
      this.apollo.mutate({
        mutation: UPDATE_ROLES,
        refetchQueries: [{ query: GET_ROLES }],
        variables: {
          name: name
        }
      }).subscribe(() => {
        console.log("Cập nhật thành công")
        alert("Cập nhật thành công")
      })
    }

    deleteRole(id: any): void {
        this.apollo.mutate({
          mutation: DELETE_ROLES,
          refetchQueries: [{ query: GET_ROLES }],
          variables: {
            id: id
          }
        }).subscribe(() => {
          console.log("Xóa thành công")
          alert("Xóa thành công")
        })
    }

    showFormDialog() {
      this.showForm = true;
    }

    submitForm() {
      this.showForm = false;
    }

    showFormUpdateDialog() {
      this.showFormUpdate = true;
    }

    submitFormUpdate() {
      this.showFormUpdate = false;
    }
}
