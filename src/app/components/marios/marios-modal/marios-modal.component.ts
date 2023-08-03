import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Marios } from 'src/app/core/interfaces/marios.interface';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-marios-modal',
  templateUrl: './marios-modal.component.html',
  styleUrls: ['./marios-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatButtonModule],
})
export class MariosModal {
  constructor(
    public dialogRef: MatDialogRef<MariosModal>,
    @Inject(MAT_DIALOG_DATA) public data: { marios: Marios; iconSrc: string }
  ) {}
}
