import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/teams';

@Injectable()
export class ClickUpService {

    constructor(private http: HttpClient) {}

    public loadTeams(apiKey: string): Observable<Team[]> {
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.clickup.com/api/v2/team';
        return this.http.get<Team[]>(url, { headers });
    }
}
