import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Admin {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/admin/login`, {
      email,
      password
    });
  }

   addTeams(team:any) {
    return this.http.post(`${environment.apiUrl}/api/admin/add-team`, team);
  }

  getTeams() {
    return this.http.get(`${environment.apiUrl}/api/admin/get-teams`);
  }
}
