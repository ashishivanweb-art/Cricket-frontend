import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CricketService {


  constructor(private http:HttpClient) {}

   getSeries() {
    return this.http.get(`${environment.apiUrl}/api/cricket/series`);
  }

  getSeriesById(id: string) {
    return this.http.get(`${environment.apiUrl}/api/cricket/series/${id}`);
  }

  getMatches(){
    return this.http.get(`${environment.apiUrl}/api/cricket/matches`);
  }

  getMatchById(id: string) {
    return this.http.get(`${environment.apiUrl}/api/cricket/match/${id}`);
  }

  getScorecard(matchId: string) {
  return this.http.get(`${environment.apiUrl}/api/cricket/scorecard/${matchId}`);
}

getBatsmanScorecard(matchId: string) {
  return this.http.get(`${environment.apiUrl}/api/cricket/scorecard/batsmen/${matchId}`);
}

getBowlerFigures(matchId: string) {
  return this.http.get(`${environment.apiUrl}/api/cricket/scorecard/bowlers/${matchId}`);
}

getLastOver(matchId: string) {
  return this.http.get(`${environment.apiUrl}/api/cricket/last-over/${matchId}`);
}

startMatch(matchId: string, data: any) {
  return this.http.post(
    `${environment.apiUrl}/api/admin/start-match/${matchId}`,
    data
  );
}





}
