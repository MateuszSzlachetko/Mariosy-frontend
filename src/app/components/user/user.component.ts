import { UserService } from './../../core/services/user.service';
import { User } from './../../core/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  private users: User[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsers() {
    this.userService.users.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}
