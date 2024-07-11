import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginDTO } from "../dtos/login.dto";
import { environment } from "../environmens/environment";
import { RegisterDTO } from "../dtos/register.dto";
import { HttpUtilService } from "./http.util.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiLogin = `${environment.apiBaseUrl}/api/v1/users/login`;
    private apiRegister = `${environment.apiBaseUrl}/api/v1/users/register`;
    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) { }

    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    }

    login(loginDTO: LoginDTO): Observable<any> {
        return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
    }

    register(registerDTO: RegisterDTO): Observable<any> {
        return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
    }

}