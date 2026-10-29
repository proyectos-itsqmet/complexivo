import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './shared/nav-bar/nav-bar';
import { LoginForm } from './shared/login-form/login-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('complexivo');
}
