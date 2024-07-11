import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginDTO {
    @IsEmail()
    email: String;

    @IsString()
    password: String;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
    }
}