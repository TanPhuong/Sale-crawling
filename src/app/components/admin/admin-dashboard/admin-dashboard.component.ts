import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_CRAWL, GET_PRODUCT } from 'src/app/graphql.operations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  crawls: any;
  products: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
      this.getCrawl();
  }

  getCrawl(): void {
    this.crawls = this.apollo.watchQuery({
      query: GET_CRAWL,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findAllCrawl);
        return result.data.findAllCrawl;
      })
    )
  }

  crawlingProduct(): void {
    this.products = this.apollo.watchQuery({
      query: GET_PRODUCT,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findAllProduct);
        return result.data.findAllProduct;
      })
    ) 
  }
}
