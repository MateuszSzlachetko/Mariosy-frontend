import { UserService } from './../../core/services/user.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user.interface';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('f') loginForm!: NgForm;

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  onSubmit() {
    const username = this.loginForm.value.username;

    this.userService.getUserByUsername(username).subscribe((data) => {
      const user: User = data;
      console.log(data);
      this.sessionService.saveCurrentUserCookie(user);
    });
  }
}
