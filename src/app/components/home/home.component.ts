import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { OrderDTO } from 'src/app/dtos/order.dto';
import { ALL_PRODUCT, CREATE_TASK, GET_PRODUCT, GET_PRODUCT_BY_DISCOUNT, GET_PRODUCT_BY_PRICE, GET_USER_BY_EMAIL, PRIORITIZE_PRODUCT, REALTIME_CRAWLING } from 'src/app/graphql.operations';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  user: any;
  products: any;
  orderData: any;
  checkOutURL: any;


  constructor(private apollo: Apollo, private storageService: StorageService, 
    private router: Router, private userService: UserService, private webSocket: WebSocketService) {}

  ngOnInit(): void { 
    
    this.crawlProduct();
    this.realtimeCrawling();

    this.getUser();
    

    this.webSocket.onEvent().subscribe({
      next: (message) => {
        console.log('Received message: ' + message.body);
        this.getProduct();
      },
      error: (err) => {
        console.error('Error message: ' + err);
      }
    })
  }

  setByPrice(): void {
    this.productByPrice();
  }

  setByDiscount(): void {
    this.productByDiscount()
  }

  setBySold(): void {
    this.findProduct()
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
      query: ALL_PRODUCT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.getAllProduct;
      })
    )
  }

  crawlProduct(): void {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.findAllProduct;
      })
    )
  }

  findProduct(): void {
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

  realtimeCrawling(): void {
    this.apollo.watchQuery({
      query: REALTIME_CRAWLING
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.realTimeCrawl;
      })
    )
  }

  productByPrice(): void {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCT_BY_PRICE,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.findProductByPriceDESC;
      })
    )
  }

  productByDiscount(): void {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCT_BY_DISCOUNT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result);
        return result.data.findProductByDiscount;
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
        this.orderData = response.add_to_cart;

        window.location.href = `https://tiki.vn/checkout/buy-now?data=${ this.orderData }`;
      },
      error(err: any) {
        console.error(err);
      }
    })
  }
}