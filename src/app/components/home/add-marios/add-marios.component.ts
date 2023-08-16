import { MariosService } from './../../../core/services/marios.service';
import { MariosPayload } from './../../../core/interfaces/marios.interface';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ChipsReactions,
  Reaction,
} from '../../../core/models/chips-reaction.model';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.scss'],
})
export class AddMariosComponent implements OnInit, OnDestroy {
  @ViewChild('f') mariosForm!: NgForm;
  @ViewChild('userSelect') userSelectComponent!: NgSelectComponent;
  selected: string[] = [];
  chips: Reaction[] = new ChipsReactions().chips;
  users: User[] = [];
  private destroy$: Subject<void> = new Subject();
  commentText: string = '';
  userSelectPlaceholder = 'Who you want to recognize?';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private marioService: MariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.sessionService.getCurrentUserGivenMariosy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const author = this.sessionService.getCurrentUserId();
    const title = this.mariosForm.value.title;
    const comment = this.mariosForm.value.comment;
    const characterName = this.mariosForm.value.chips;

    const mariosPayload: MariosPayload = {
      authorId: author,
      receiversIds: this.selected,
      title: title,
      comment: comment,
      characterName: characterName,
    };

    this.marioService.postMarios(mariosPayload);

    this.mariosForm.reset({
      selected: [],
      comment: '',
      title: '',
    });
  }

  getUsers() {
    this.userService.users.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.users = data;
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
