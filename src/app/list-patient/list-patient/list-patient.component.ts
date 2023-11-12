import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { EtatService } from '../../etat.service';
import { Etat } from '../../etat';
import { Patient } from '../../patient';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  patients: Patient[] = [];
  selectedPatient: Patient | undefined;
  chartOptions: any;
  isVisible :boolean = false;
  updateFlag = false;

  constructor(private _servicePatient: PatientService, private _serviceEtat: EtatService) { }

  ngOnInit(): void {
    this.initPatients();
  }

  initPatients() {
    this._servicePatient.getListPatient().subscribe((dataArray: Patient[]) => {
      const people: Patient[] = dataArray.map((data: any) => new Patient(data.id, data.name));
      people.forEach(patient => {
        this._serviceEtat.getListEtatById(patient.id).subscribe((arrayEtat: any[]) => {
          let etats :Etat[] = arrayEtat.map((dataEtat: any) =>
            new Etat(dataEtat.id, dataEtat.day, dataEtat.temperature, dataEtat.saturation, patient));
          patient.etats = etats;
          patient.setPoints();
        });
      });
      this.patients = people;
    });
    console.log(this.patients);
  }

}
