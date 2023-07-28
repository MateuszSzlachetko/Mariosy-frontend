import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Marios } from '../interfaces/marios.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = 'api/v1/users';
  private usersData: User[] = [];
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  get users() {
    if (this.usersData.length === 0) {
      this.fetchUsers();
    }
    return this.users$.asObservable();
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(this.usersUrl + `/?username=${username}`);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  fetchUsers() {
    return this.http.get<User[]>(this.usersUrl).subscribe((data) => {
      this.usersData = data;
      console.log(this.users);
      this.users$.next(data);
    });
  }

  saveCurrentUserCookie(user: User) {
    const expiration: Date = new Date();
    expiration.setDate(expiration.getDate() + 1);
    this.cookieService.set('loggedUserId', user.externalId, expiration);
  }

  getCurrentUserId(): string {
    const userId = this.cookieService.get('loggedUserId');

    //if (userId === '') this.router.navigate(['/login']);

    return this.cookieService.get('loggedUserId');
  }

  getUserReceivedMarios() {
    const currentUserId = this.getCurrentUserId();
    const url = this.usersUrl + `/${currentUserId}/marios/received`;

    return this.http.get<Marios[]>(url);
  }
}
