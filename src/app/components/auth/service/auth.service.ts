import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/utils/models';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint: string = environment.url;
  private token: string;
  private userId: string;
  private isAuthenticated: boolean;
  private authTimer: any;
  private Loading = new BehaviorSubject<boolean>(false);
  private authListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  signin(data: User) {
    this.Loading.next(true);
    return this.http.post<{ token: string; userId: string }>(`${this.endPoint}/user/login`, data).subscribe((res) => {
      // console.log(res);
      this.token = res.token;
      this.userId = res.userId;
      this.isAuthenticated = true;
      const now = Date.now();
      const expiresIn = 3600 * 1000;
      const expirationDate = new Date(now + expiresIn);
      this.saveAuthData(this.userId, this.token, expirationDate);
      this.setAuthTimer(expiresIn);
      this.Loading.next(false);
      this.authListener.next(true);
      this.router.navigate(['expenses']);
    });
  }

  signup(data: User) {
    this.Loading.next(true);
    return this.http.post<{ message: string; result: any }>(`${this.endPoint}/user/signup`, data).subscribe((res) => {
      this.Loading.next(false);
      this.router.navigate(['auth/signin']);
    });
  }

  getLoading() {
    return this.Loading.asObservable();
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  setAuthTimer(duartion: number) {
    this.authTimer = setTimeout(() => {
      this.logout();
    }, duartion);
  }

  autoLogOn() {
    const getAuthInfo = this.getAuthData();
    if (!getAuthInfo) {
      return;
    }
    const { userId, token, expirationDate } = getAuthInfo;
    const now = Date.now();
    const expiresIn = expirationDate.getTime() - now;
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.userId = userId;
      this.token = token;
      this.isAuthenticated = true;
      this.authListener.next(true);
      this.setAuthTimer(expiresIn);
    }
  }

  saveAuthData(userId: string, token: string, expirationDate: Date) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private getAuthData() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }

    return { userId, token, expirationDate: new Date(expirationDate) };
  }

  logout() {
    this.userId = null;
    this.token = null;
    this.isAuthenticated = false;
    this.authListener.next(false);
    clearTimeout(this.authTimer);
    this.clearAuthData();
    this.router.navigate(['auth/signin']);
  }

  clearAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
}
