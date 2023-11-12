import { Component,Input } from '@angular/core';
import { Patient } from '../../patient';
import { FormBuilder } from '@angular/forms';
import { EtatService } from '../../etat.service';
import { Etat } from '../../etat';

@Component({
  selector: 'app-insert-patient',
  templateUrl: './insert-patient.component.html',
  styleUrls: ['./insert-patient.component.css']
})
export class InsertPatientComponent {

  @Input() patient! :Patient;

  constructor(private formBuilder: FormBuilder, private _serviceEtat :EtatService) { }

  onSubmit(value: any): void {
    const etat :Etat = new Etat('', value.day, value.temperature, value.saturation, this.patient);
    // console.log(etat);
    this._serviceEtat.insertEtat(etat);
    // etat.insert(this._serviceEtat);
  }

}
