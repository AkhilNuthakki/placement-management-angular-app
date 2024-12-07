import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';
import { SuccessMessageComponent } from './shared/components/success-message/success-message.component';
import { PlacementsListComponent } from './components/placements-list/placements-list.component';
import { AuthorizationRequestFormComponent } from './components/authorization-request-form/authorization-request-form.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { ProviderFormComponent } from './components/provider-form/provider-form.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';
import { RequestOverviewComponent } from './components/request-overview/request-overview.component';
import { UserNamePipe } from './pipes/user-name.pipe';
import { PlacementComponent } from './components/placement/placement.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlacementVisitsComponent } from './components/placement-visits/placement-visits.component';
import { PlacementsMapViewComponent } from './components/placements-map-view/placements-map-view.component';
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    PlacementsListComponent,
    AuthorizationRequestFormComponent,
    RequestsListComponent,
    ProviderFormComponent,
    AssessmentFormComponent,
    RequestOverviewComponent,
    UserNamePipe,
    PlacementComponent,
    DashboardComponent,
    PlacementVisitsComponent,
    PlacementsMapViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
