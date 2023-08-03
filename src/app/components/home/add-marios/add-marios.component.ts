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

@Component({
  selector: 'app-add-marios',
  templateUrl: './add-marios.component.html',
  styleUrls: ['./add-marios.component.scss'],
})
export class AddMariosComponent implements OnInit, OnDestroy {
  @ViewChild('f') mariosForm!: NgForm;

  selected: string[] = [];
  chips: Reaction[] = new ChipsReactions().chips;
  users: User[] = [];
  private destroy$: Subject<void> = new Subject();
  commentText: string = '';

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private marioService: MariosService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const author = this.sessionService.getCurrentUserId();
    let receivers: string[] = [];
    this.selected.forEach((user) => {
      console.log(user);
      receivers.push(user);
    });
    const title = this.mariosForm.value.title;
    const comment = this.commentText;
    const characterName = this.mariosForm.value.chips;

    const mariosPayload: MariosPayload = {
      authorId: author,
      receiversIds: receivers,
      title: title,
      comment: comment,
      characterName: characterName,
    };

    this.marioService.postMarios(mariosPayload);
  }

  getUsers() {
    this.userService.users.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}
