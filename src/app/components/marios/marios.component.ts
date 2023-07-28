import { Component, Input, OnInit } from '@angular/core';
import { Marios } from 'src/app/core/interfaces/marios.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-marios',
  templateUrl: './marios.component.html',
  styleUrls: ['./marios.component.scss'],
})
export class MariosComponent implements OnInit {
  @Input() marios!: Marios;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById(this.marios.author).subscribe((data) => {
      this.marios.author = data.username;
    });
  }
}
