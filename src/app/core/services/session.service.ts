import { BehaviorSubject, map, zip } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { Marios, Mariosy } from './../interfaces/marios.interface';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  currentUserId: string;
  receivedMariosy: Mariosy = { mariosy: [], count: 0 };
  receivedMariosArray$ = new BehaviorSubject<Marios[]>([]);
  receivedMariosCount$ = new BehaviorSubject<number>(0);

  givenMariosy: Mariosy = { mariosy: [], count: 0 };
  givenMariosArray$ = new BehaviorSubject<Marios[]>([]);
  givenMariosCount$ = new BehaviorSubject<number>(0);

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.currentUserId = this.cookieService.get('loggedUserId');
  }

  getCurrentUserLastMariosy() {
    return zip(
      this.getCurrentUserGivenMariosy(),
      this.getCurrentUserReceivedMariosy()
    ).pipe(
      map(([s1, s2]) => [...s1, ...s2]),
      map((res) =>
        res.sort((a, b) => {
          return -new Date(a.creationDate) + +new Date(b.creationDate);
        })
      )
    );
  }

  getCurrentUserReceivedMariosy() {
    if (this.receivedMariosy.mariosy.length === 0)
      this.fetchUserReceivedMariosy();

    return this.receivedMariosArray$.asObservable();
  }

  getCurrentUserReceivedMariosyCount() {
    if (this.receivedMariosy.mariosy.length === 0)
      this.fetchUserReceivedMariosy();

    return this.receivedMariosCount$.asObservable();
  }

  fetchUserReceivedMariosy() {
    return this.userService
      .getUserReceivedMariosy(this.currentUserId)
      .subscribe((data: Mariosy) => {
        this.receivedMariosy.mariosy = data.mariosy;
        this.receivedMariosy.count = data.count;
        this.receivedMariosArray$.next(data.mariosy);
        this.receivedMariosCount$.next(data.count);
      });
  }

  getCurrentUserGivenMariosy() {
    if (this.givenMariosy.mariosy.length === 0) this.fetchUserSentMariosy();

    return this.givenMariosArray$.asObservable();
  }

  getCurrentUserGivenMariosyCount() {
    if (this.givenMariosy.mariosy.length === 0) this.fetchUserSentMariosy();

    return this.givenMariosCount$.asObservable();
  }

  fetchUserSentMariosy() {
    return this.userService
      .getUserGivenMariosy(this.currentUserId)
      .subscribe((data: Mariosy) => {
        this.givenMariosy.mariosy = data.mariosy;
        this.givenMariosy.count = data.count;
        this.givenMariosArray$.next(data.mariosy);
        this.givenMariosCount$.next(data.count);
      });
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

  updateGivenMarios(marios: Marios) {
    this.givenMariosy.mariosy.push(marios);
    this.givenMariosy.count++;
    this.givenMariosArray$.next(this.givenMariosy.mariosy);
    this.givenMariosCount$.next(this.givenMariosy.count);
  }
}
