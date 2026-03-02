import { Routes } from '@angular/router';
import { AdminGuard } from './admin/admin-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'series',
    loadComponent: () => import('./pages/series/series.page').then( m => m.SeriesPage)
  },
  {
    path: 'match/:seriesId',
    loadComponent: () => import('./pages/matches/matches.page').then( m => m.MatchesPage)
  },
  {
    path: 'match-detail',
    loadComponent: () => import('./pages/match-detail/match-detail.page').then( m => m.MatchDetailPage)
  },
  {
  path: 'scorecard/:matchId',
  loadComponent: () =>
    import('./pages/scorecard/scorecard.component').then(m => m.ScorecardComponent)
},
  {
    path: 'admin-pre-match',
    loadComponent: () => import('./admin/admin-pre-match/admin-pre-match.page').then( m => m.AdminPreMatchPage)
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./admin/admin-login/admin-login.page').then( m => m.AdminLoginPage)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage),
     canActivate: [AdminGuard] 
  },
  {
    path: 'admin-teams',
    loadComponent: () => import('./admin/teams/teams.page').then( m => m.TeamsPage), canActivate: [AdminGuard]
  },
  {
    path: 'team-details/:id',
    loadComponent: () => import('./admin/team-details/team-details.page').then( m => m.TeamDetailsPage), canActivate: [AdminGuard]
  },
  {
    path: 'admin-series',
    loadComponent: () => import('./admin/series/series.page').then( m => m.SeriesPage), canActivate: [AdminGuard]
  },
  {
    path: 'matches/:id',
    loadComponent: () => import('./admin/matches/matches.page').then( m => m.MatchesPage), canActivate: [AdminGuard]
  },




  
];
