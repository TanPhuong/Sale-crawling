import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminRoleComponent } from './components/admin/admin-role/admin-role.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AdminUserComponent,
    ProfileComponent,
    AdminRoleComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
