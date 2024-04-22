import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsResponse } from '../interfaces/teams';
import { SpacesResponse } from '../interfaces/spaces';
import { FoldersResponse } from '../interfaces/folders';

@Injectable()
export class ClickUpService {

    constructor(private http: HttpClient) {}

    public loadTeams(): Observable<TeamsResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.clickup.com/api/v2/team';
        return this.http.get<TeamsResponse>(url, { headers });
    }

    public loadSpaces(teamId: number): Observable<SpacesResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = `https://api.clickup.com/api/v2/team/${teamId}/space`;
        return this.http.get<SpacesResponse>(url, { headers });
    }

    public loadFolders(spaceId: number): Observable<FoldersResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = `https://api.clickup.com/api/v2/space/${spaceId}/folder`;
        return this.http.get<FoldersResponse>(url, { headers });
    }
}
