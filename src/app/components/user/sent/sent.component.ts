import { Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Marios } from 'src/app/core/interfaces/marios.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss'],
})
export class SentComponent implements OnInit, OnDestroy {
  givenMarios: Marios[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sessionService
      .getCurrentUserGivenMariosy()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Marios[]) => {
        this.givenMarios = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
