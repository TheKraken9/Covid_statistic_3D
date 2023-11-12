import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from "./list-patient/list-patient/list-patient.component";

const routes: Routes = [
  { path: 'list-patient', component: ListPatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
