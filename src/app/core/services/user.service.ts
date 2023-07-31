import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Marios, Mariosy } from '../interfaces/marios.interface';

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
    console.log(id);
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  fetchUsers() {
    return this.http.get<User[]>(this.usersUrl).subscribe((data) => {
      this.usersData = data;
      console.log(this.users);
      this.users$.next(data);
    });
  }

  getUserReceivedMariosy(id: string) {
    const url = this.usersUrl + `/${id}/marios/received`;
    return this.http.get<Mariosy>(url);
  }

  getUserGivenMariosy(id: string) {
    const url = this.usersUrl + `/${id}/marios/given`;
    return this.http.get<Mariosy>(url);
  }
}
