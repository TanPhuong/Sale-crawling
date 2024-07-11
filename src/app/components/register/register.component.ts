import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/dtos/register.dto';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };

  constructor(private router: Router, private userService: UserService,
    private tokenService: TokenService, private storageService: StorageService) { }

  register(): void {
    const { username, email, password, confirmPassword } = this.form;

    const registerDTO : RegisterDTO = { username, email, password, confirmPassword };

    this.userService.register(registerDTO).subscribe({
      next: (response : any) => {
        this.router.navigate(['/login']);
        console.log(response);
      },
      error(err : any) {
          alert(`Đăng ký không thành công, Lỗi: ${err.error.message}`);
          console.log(err.error.message);
      }
    })
  }

  checkPasswordsMatch() {    
    const { password, confirmPassword } = this.form;
    if (password !== confirmPassword) {
      this.form.controls['confirmPassword']
            .setErrors({ 'passwordMismatch': true });
    } else {
      this.form.controls['confirmPassword'].setErrors(null);
    }
  }
}
