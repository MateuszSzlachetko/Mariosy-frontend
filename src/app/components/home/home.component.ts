import { SessionService } from './../../core/services/session.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: string | null = '';
  received: string = 'RECEIVED MARIOS:';
  sent: string = 'SENT MARIOS:';

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionService.getCurrentUserId();
  }
}
