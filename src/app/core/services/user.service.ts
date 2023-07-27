import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = 'api/v1/users';
  private usersData: User[] = [];
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  get users() {
    if (this.usersData.length === 0) {
      this.fetchUsers();
    }
    return this.users$.asObservable();
  }

  getUserByUsername(username: string) {
    return this.http.get<User>(this.usersUrl + `/?username=${username}`);
  }

  fetchUsers() {
    return this.http.get<User[]>(this.usersUrl).subscribe((data) => {
      this.usersData = data;
      console.log(this.users);
      this.users$.next(data);
    });
  }

  saveCurrentUserCookie(user: User) {
    console.log(user.externalId);
    localStorage.setItem('user', user.externalId);
    console.log(localStorage.getItem('user'));
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem('user');
  }
}
