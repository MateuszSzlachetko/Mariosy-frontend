import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marios-info',
  templateUrl: './marios-info.component.html',
  styleUrls: ['./marios-info.component.scss'],
})
export class MariosInfoComponent {
  @Input() userId: string | null = '';
  @Input() message: string = '';
}
