import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (ok) => {
        if (!ok) {
          alert('Credenciales incorrectas');
          return;
        }
        this.router.navigate(['/admin']);
      },
      error: (error: Error) => alert(error.message),
    });
  }
}
