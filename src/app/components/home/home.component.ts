import { SessionService } from './../../core/services/session.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userId: string | null = '';
  received: string = 'RECEIVED MARIOS:';
  sent: string = 'SENT MARIOS:';
  destroy$: Subject<void> = new Subject();

  receivedCount: number = 0;
  sentCount: number = 0;

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionService.getCurrentUserId();
    this.sessionService
      .getCurrentUserReceivedMariosyCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        this.receivedCount = data;
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
