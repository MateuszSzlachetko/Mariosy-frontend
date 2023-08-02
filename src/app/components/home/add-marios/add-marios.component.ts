import { UserService } from 'src/app/core/services/user.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { Subject, takeUntil } from 'rxjs';
import { ChipsReactions, Reaction } from './chips-reaction.model';

@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.scss'],
})
export class AddMariosComponent implements OnInit, OnDestroy {
  @ViewChild('f') mariosForm!: NgForm;

  selected: User[] = [];
  chips: Reaction[] = new ChipsReactions().chips;
  users: User[] = [];
  private destroy$: Subject<void> = new Subject();
  commentText: string = '';

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const username = this.mariosForm.value.username;

    this.userService.getUserByUsername(username).subscribe((data) => {
      const user: User = data;
      console.log(data);
      this.sessionService.saveCurrentUserCookie(user);
    });
  }

  getUsers() {
    this.userService.users.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}
