import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Marios } from 'src/app/core/interfaces/marios.interface';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit {
  receivedMarios: Marios[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserReceivedMarios().subscribe((data) => {
      this.receivedMarios = data;
    });
  }
}
