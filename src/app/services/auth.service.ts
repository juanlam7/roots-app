import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = environment.api

  constructor(public http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/auth/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const body = {
      email,
      password
    }

    return this.http.post<any>(endpoint, JSON.stringify(body), { headers: headers })
  }
}
