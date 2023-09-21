import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

constructor(private http: HttpClient) {
}

POST(url: string, bean?: any): Observable<Response> {
    const parametro: string = bean != null ? JSON.stringify(bean) : '{}';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set('Content-Type', 'application/json');
    return this.http.post<Response>(url, parametro, { headers: myHeader });
}

PUT(url: string, bean?: any): Observable<Response> {
    const parametro: string = bean != null ? JSON.stringify(bean) : '{}';
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set('Content-Type', 'application/json');
    return this.http.put<Response>(url, parametro, { headers: myHeader });
}

GET(url: string, bean?: any): Observable<Response> {
    let params = new HttpParams();
    let myHeader = new HttpHeaders();
    myHeader = myHeader.set('Content-Type', 'application/json');
    if (bean != null) {
        for (let k in bean) {
            if (k == null){
              params = params.append('', bean[k]);
            }else{
              params = params.append(k, bean[k]);
            }
        }
    }
    return this.http.get<Response>(url, { params: params , headers: myHeader });
}
}
