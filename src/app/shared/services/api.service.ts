import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://data.covid19india.org/v4/min/data.min.json';

  constructor(private httpClient: HttpClient) { }

  // Function to make the API call
  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}
