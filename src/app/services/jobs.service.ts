import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  public apiUrl = environment.api

  constructor(public http: HttpClient) { }

  // *************************** para obtener todos los usuarios ****************************************************
  getJobs(id: number) : Observable<any>{
    const endpoint = `${this.apiUrl}/jobs?page=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Token')
    })
    return this.http.get<any>(endpoint, { headers: headers })
  }
}
