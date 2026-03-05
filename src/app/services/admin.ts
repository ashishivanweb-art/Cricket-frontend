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
// Team APIs
   addTeams(team:any) {
    return this.http.post(`${environment.apiUrl}/api/admin/add-team`, team);
  }

  getTeams() {
    return this.http.get(`${environment.apiUrl}/api/admin/get-teams`);
  }

  getTeamsById(id:string) {
    return this.http.get(`${environment.apiUrl}/api/admin/get-teams/${id}`);
  }

  updateTeam(id: string, data: any) {
  return this.http.put(`${environment.apiUrl}/api/admin/update-team/${id}`, data);
}

  deleteTeam(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/admin/delete-team/${id}`);
  }

// Player APIs
   addPlayer(player:any) {
    return this.http.post(`${environment.apiUrl}/api/admin/add-player`, player
    );
  }

   updatePlayer(playerId: string, player: any) {
    return this.http.put(`${environment.apiUrl}/api/admin/player/${playerId}`, player);
  }
  removePlayer(teamId: any, playerId: string) {
  return this.http.delete(`${environment.apiUrl}/api/admin/team/${teamId}/player/${playerId}`);
}

//Series APIs
getSeries() {
  return this.http.get(`${environment.apiUrl}/api/admin/get-my-series`); 

}

addSeries(series: any) {
  return this.http.post(`${environment.apiUrl}/api/admin/add-series`, series);

}

updateSeries(series: any) {
  return this.http.put(`${environment.apiUrl}/api/admin/update-series/${series._id}`, series);
}

// Matches APIs
getMatchesBySeries(seriesId: string) {
  return this.http.get(`${environment.apiUrl}/api/admin/series/${seriesId}/matches`);

}

addMatch(match: any) {
  return this.http.post(`${environment.apiUrl}/api/admin/add-match`, match);

}

updateMatch(matchId: string, match: any) {
  return this.http.put(`${environment.apiUrl}/api/admin/update-match/${matchId}`, match);
}

deleteMatch(matchId: string) {
  return this.http.delete(`${environment.apiUrl}/api/admin/delete-match/${matchId}`);
}

}
 
