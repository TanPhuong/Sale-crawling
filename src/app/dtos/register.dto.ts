import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class RegisterDTO {

    @IsString()
    username: String;

    @IsEmail()
    email: String;

    @IsString()
    password: String;

    @IsString()
    confirmPassword: String;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
        this.username = data.username;
        this.confirmPassword = data.confirmPassword;
    }
}