import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private rateUrl = 'https://brmed-back.herokuapp.com/rates/?page_size=5'; 

  constructor(private http: HttpClient) { }

  getRates(page:Number): Observable<any>{
    return this.http.get<any>(this.rateUrl+ '&page=' + page)
  }
}
