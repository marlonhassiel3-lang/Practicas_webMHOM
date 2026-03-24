import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = '/api/admin/login';
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credenciales: any): Observable<any> {
    return this.http.post(this.apiUrl, credenciales).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Guardar sesión en el navegador
          if (typeof window !== 'undefined') {
            localStorage.setItem('adminToken', response.token);
            localStorage.setItem('adminUser', JSON.stringify(response.user));
          }
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('adminToken');
    }
    return false;
  }

  getUserData(): any {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('adminUser');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  getRole(): string | null {
    const user = this.getUserData();
    return user ? user.rol : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isProfesor(): boolean {
    return this.getRole() === 'PROFESOR';
  }
}