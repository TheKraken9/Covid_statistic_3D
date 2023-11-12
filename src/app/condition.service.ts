import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from './url';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  constructor(private _http: HttpClient) { }

  getListCondition() :Observable<any> {
    return this._http.get(url + '/list-condition');
  }
}
