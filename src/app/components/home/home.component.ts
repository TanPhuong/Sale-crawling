import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { CREATE_TASK, GET_PRODUCT, GET_USER_BY_EMAIL, PRIORITIZE_PRODUCT } from 'src/app/graphql.operations';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any
  products: any

  constructor(private apollo: Apollo, private storageService: StorageService, 
    private router: Router, private userService: UserService) {}

  ngOnInit(): void {
      this.getProduct();
      this.getUser();
  }

  getUser(): void {
    const email = this.storageService.getUserInfo(); 

    this.apollo.query({
      query: GET_USER_BY_EMAIL,
      variables: { email }
    }).subscribe((result: any) => {
      this.user = result.data.findUserByEmail
    })
  }

  getProduct(): void {
    this.products = this.apollo.watchQuery({
      query: PRIORITIZE_PRODUCT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.prioritizeProduct;
      })
    )
  }

  createOrder(productInput: any): void {
    const order: OrderDTO = {
      createAt: new Date().toISOString(),
      product: productInput,
      user: this.user
    }

    this.userService.createOrder(order).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error(err: any) {
        console.log(err.error.message);
      }
    })
  }
}
