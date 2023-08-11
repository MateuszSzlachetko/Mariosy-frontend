import { Router } from '@angular/router';
import { SessionService } from './../../core/services/session.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Marios } from 'src/app/core/interfaces/marios.interface';
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

  lastMarios: Marios[] = [];
  receivedCount: number = 0;
  givenCount: number = 0;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.sessionService.getCurrentUserId();

    this.sessionService
      .getCurrentUserReceivedMariosyCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        this.receivedCount = data;
      });

    this.sessionService
      .getCurrentUserGivenMariosyCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        this.givenCount = data;
      });

    this.sessionService
      .getCurrentUserLastMariosy()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Marios[]) => {
        this.lastMarios = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToAdd() {
    this.router.navigateByUrl('/add');
  }
}
