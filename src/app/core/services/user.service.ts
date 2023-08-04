import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { Mariosy } from '../interfaces/marios.interface';

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

  getUserById(id: string) {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  fetchUsers() {
    return this.http.get<User[]>(this.usersUrl).subscribe((data) => {
      this.usersData = data;
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
