import { MariosService } from './../../core/services/marios.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Marios } from 'src/app/core/interfaces/marios.interface';
import { MariosModal } from './marios-modal/marios-modal.component';

@Component({
  selector: 'app-marios',
  templateUrl: './marios.component.html',
  styleUrls: ['./marios.component.scss'],
})
export class MariosComponent implements OnInit {
  @Input() marios!: Marios;
  maxCommentLengthUntilSeeMore: number = 50;
  iconSrc: string = '';

  constructor(private marioService: MariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.iconSrc = this.marioService.getReactionIconSrc(
      this.marios.characterName
    );
  }

  openDialog() {
    this.dialog.open(MariosModal, {
      panelClass: 'marios-panel',
      data: { marios: this.marios, iconSrc: this.iconSrc },
    });
  }
}
