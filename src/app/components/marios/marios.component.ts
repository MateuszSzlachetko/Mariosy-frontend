import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Marios } from 'src/app/core/interfaces/marios.interface';
import { UserService } from 'src/app/core/services/user.service';
import { MariosModal } from './marios-modal/marios-modal.component';

@Component({
  selector: 'app-marios',
  templateUrl: './marios.component.html',
  styleUrls: ['./marios.component.scss'],
})
export class MariosComponent {
  @Input() marios!: Marios;
  maxCommentLength: number = 10;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(MariosModal, {
      panelClass: 'marios-panel',
      data: this.marios,
    });
  }
}
