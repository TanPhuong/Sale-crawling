import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_PRODUCT, GET_USER_BY_EMAIL } from 'src/app/graphql.operations';
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
  }


  getProduct(): void {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.getProduct);
        return result.data.getProduct;
      })
    )
  }

  createOrder(): void {
    
  }
}
