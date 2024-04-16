import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ClickUpService {

    constructor(private http: HttpClient) {}

    public loadDataFromApi(): Observable<any> {
        const headerBody = { 'Authorization': process.env['API_KEY'] ?? '' }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.clickup.com/api/v2/team';
        return this.http.get(url, { headers });
    }
}
