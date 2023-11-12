import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { url } from './url';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http: HttpClient) { }

  getListPatient() :Observable<Patient[]> {
    return this._http.get<Patient[]>(url + '/list-patient');
  }
}
