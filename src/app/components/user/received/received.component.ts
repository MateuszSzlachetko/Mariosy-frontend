import { Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Marios } from 'src/app/core/interfaces/marios.interface';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit, OnDestroy {
  receivedMarios: Marios[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService
      .getCurrentUserReceivedMariosy()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Marios[]) => {
        this.receivedMarios = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
