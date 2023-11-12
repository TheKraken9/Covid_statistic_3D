import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EtatService } from './etat.service';
import { PatientService } from './patient.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPatientComponent } from './list-patient/list-patient/list-patient.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph/graph.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InsertPatientComponent } from './insert-patient/insert-patient/insert-patient.component';
import { ConditionService } from "./condition.service";



@NgModule({
  declarations: [
    AppComponent,
    ListPatientComponent,
    GraphComponent,
    InsertPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    HighchartsChartModule
  ],
  providers: [PatientService, EtatService, ConditionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
