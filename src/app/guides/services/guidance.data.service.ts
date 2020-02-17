import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Guidance } from '../models/guidance.data';

@Injectable()
export class GuidanceDataService {

    private guidanceRes = '/api/v1/guides';
    public constructor(
        private http: HttpClient,
        private sessionConfig: IqsSessionConfigService
    ) { }

    private fixGuide(guide: Guidance): Guidance {
        guide.max_ver = Number(guide.max_ver) !== NaN ? Number(guide.max_ver) : null;

        guide.min_ver = Number(guide.min_ver) !== NaN ? Number(guide.min_ver) : null;

        return guide;
    }

    public get serverUrl(): string {
        return this.sessionConfig.serverUrl;
    }

    private handleError(response: Response) {
        const error = response.json();
        return Observable.throw(error);
    }

    public guidances(): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.guidanceRes;
        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );
    }

    public guidanceUpdate(guidance: Guidance): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.guidanceRes + '/' + guidance.id;
        const request: any = {};

        return this.http.put(url, this.fixGuide(guidance), request)
            .pipe(
                map(response => {

                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public guidanceCreate(guidance: Guidance): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.guidanceRes;
        const request: any = {};

        return this.http.post(url, this.fixGuide(guidance), request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public guidanceDelete(id: string): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.guidanceRes + '/' + id;
        const request: any = {};

        return this.http.delete(url, request)
            .pipe(
                map(response => {
                    return id;
                }),
                catchError(this.handleError)
            );
    }

}
