import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { AdminRoleComponent } from "./components/admin/admin-role/admin-role.component";
import { AdminUserComponent } from "./components/admin/admin-user/admin-user.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'admin-role', component: AdminRoleComponent},
    { path: 'admin-user', component: AdminUserComponent}, 
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}