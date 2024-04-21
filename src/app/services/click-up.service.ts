import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamResponse } from '../interfaces/teams';

@Injectable()
export class ClickUpService {

    constructor(private http: HttpClient) {}

    public loadTeams(): Observable<TeamResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.clickup.com/api/v2/team';
        return this.http.get<TeamResponse>(url, { headers });
    }
}
