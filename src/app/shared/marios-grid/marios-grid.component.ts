import { Component, Input } from '@angular/core';
import { Marios } from 'src/app/core/interfaces/marios.interface';

@Component({
  selector: 'app-marios-grid',
  templateUrl: './marios-grid.component.html',
  styleUrls: ['./marios-grid.component.scss'],
})
export class MariosGridComponent {
  @Input() mariosArray: Marios[] = [];
}
