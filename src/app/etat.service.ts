import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './url';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private _http: HttpClient) {}

  getListEtatById(id :string) :Observable<any> {
    return this._http.get(url + '/list-etat/' + id);
  }

  insertEtat(data :any) {
    this._http.post(url + '/add-etat', data);
  }
}
