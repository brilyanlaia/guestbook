import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { catchError, timeout, retry } from "rxjs/operators";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { 
    
  }

  getData(
    path: string
  ): Observable<any> {
   
    return this.http.get(`${environment.api_url}${path}`).pipe(
      catchError(err => {
        return throwError(err);
      }),
      map((res: Response) => {
        return res;
      }),
      timeout(3000),
      retry(3)
    );
  }



}
