import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { Marios } from './../interfaces/marios.interface';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  currentUserId: string;
  receivedMarios: Marios[] = [];
  receivedMarios$ = new BehaviorSubject<Marios[]>([]);

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.currentUserId = this.cookieService.get('loggedUserId');
  }

  saveCurrentUserCookie(user: User) {
    const expiration: Date = new Date();
    expiration.setDate(expiration.getDate() + 1);
    this.cookieService.set('loggedUserId', user.externalId, expiration);
    this.currentUserId = user.externalId;
  }

  getCurrentUserId(): string {
    const userId = this.cookieService.get('loggedUserId');
    //if (userId === '') this.router.navigate(['/login']);
    return this.cookieService.get('loggedUserId');
  }

  getCurrentUserReceivedMarios() {
    if (this.receivedMarios.length === 0)
      this.userService
        .getUserReceivedMarios(this.currentUserId)
        .subscribe((data: Marios[]) => {
          this.receivedMarios = data;
          this.receivedMarios$.next(data);
        });
    return this.receivedMarios$.asObservable();
  }
}
