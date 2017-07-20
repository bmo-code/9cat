import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Profile } from './profile.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProfileService {

    private resourceUrl = 'api/profiles';

    constructor(private http: Http) { }

    create(profile: Profile): Observable<Profile> {
        const copy = this.convert(profile);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(profile: Profile): Observable<Profile> {
        const copy = this.convert(profile);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Profile> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(profile: Profile): Profile {
        const copy: Profile = Object.assign({}, profile);
        return copy;
    }
}
