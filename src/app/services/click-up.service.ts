import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspacesResponse } from '../interfaces/workspaces';
import { SpacesResponse } from '../interfaces/spaces';
import { FoldersResponse } from '../interfaces/folders';
import { ListsResponse } from '../interfaces/lists';

@Injectable()
export class ClickUpService {

    constructor(private http: HttpClient) {}

    public getWorkspaces(): Observable<WorkspacesResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.clickup.com/api/v2/team';
        return this.http.get<WorkspacesResponse>(url, { headers });
    }

    public getSpaces(workspaceId: number): Observable<SpacesResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = `https://api.clickup.com/api/v2/team/${workspaceId}/space`;
        return this.http.get<SpacesResponse>(url, { headers });
    }

    public getFolders(spaceId: number): Observable<FoldersResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = `https://api.clickup.com/api/v2/space/${spaceId}/folder`;
        return this.http.get<FoldersResponse>(url, { headers });
    }

    public getLists(folderId: number): Observable<ListsResponse> {
        const apiKey: string = process.env['CLICKUP_API_KEY'] ?? '';
        const headerBody = { 'Authorization': apiKey }
        const headers = new HttpHeaders(headerBody);
        const url = `https://api.clickup.com/api/v2/folder/${folderId}/list`;
        return this.http.get<ListsResponse>(url, { headers });
    }
}
