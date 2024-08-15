import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_CRAWL, GET_KEYWORD, GET_PRODUCT } from 'src/app/graphql.operations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  crawls: any;
  keywords: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
      this.getCrawl();
      this.getKeyword();
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
    console.log('Processing...')
    this.apollo.watchQuery({
      query: GET_PRODUCT,
      fetchPolicy: 'network-only'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findAllProduct);
        return result.data.findAllProduct;
      })
    ).subscribe({
      next: (products) => {
        console.log('Products:', products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    }); 
  }

  getKeyword(): void {
    this.keywords = this.apollo.watchQuery({
      query: GET_KEYWORD,
      fetchPolicy: 'cache-and-network'
    })
    .valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.findAllKeyword);
        return result.data.findAllKeyword;
      })
    )
  }
}
