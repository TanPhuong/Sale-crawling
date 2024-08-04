import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { CREATE_TASK, GET_PRODUCT, GET_USER_BY_EMAIL, PRIORITIZE_PRODUCT } from 'src/app/graphql.operations';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any
  products: any

  constructor(private apollo: Apollo, private storageService: StorageService) {}

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
    this.apollo.mutate({
      mutation: CREATE_TASK,
      variables: {
        productInput: productInput,
        userInput: this.user
      }
    })
  }
}
