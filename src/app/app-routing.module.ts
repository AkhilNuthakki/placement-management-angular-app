import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlacementsListComponent } from './components/placements-list/placements-list.component';
import { AuthorizationRequestFormComponent } from './components/authorization-request-form/authorization-request-form.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { ProviderFormComponent } from './components/provider-form/provider-form.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';
import { RequestOverviewComponent } from './components/request-overview/request-overview.component';
import { PlacementComponent } from './components/placement/placement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlacementVisitsComponent } from './components/placement-visits/placement-visits.component';
import { PlacementsMapViewComponent } from './components/placements-map-view/placements-map-view.component';

const routes: Routes = [
  {
    path: 'placements-map-view',
    component: PlacementsMapViewComponent
  },
  {
    path: 'placement-visits',
    component: PlacementVisitsComponent
  },
  {
    path: 'placements/:id',
    component: PlacementComponent
  },
  {
    path: 'placements',
    component: PlacementsListComponent
  },
  {
    path: 'requests/submit',
    component: AuthorizationRequestFormComponent
  },
  {
    path: 'requests/:id',
    component: AuthorizationRequestFormComponent
  },
  {
    path: 'requests',
    component: RequestsListComponent
  },
  {
    path: 'provider-form/submit',
    component: ProviderFormComponent
  },
  {
    path: 'provider-form/:id',
    component: ProviderFormComponent
  },
  {
    path: 'request-overview/:id',
    component: RequestOverviewComponent
  },
  {
    path: 'placement-assessment/submit',
    component: AssessmentFormComponent
  },
  {
    path: 'placement-assessment/:id',
    component: AssessmentFormComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
