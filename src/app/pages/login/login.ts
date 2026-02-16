import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any = {
    userName: '',
    password: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post('https://localhost:7020/api/Auth/login', this.loginObj).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
      },
    );
  }
}
