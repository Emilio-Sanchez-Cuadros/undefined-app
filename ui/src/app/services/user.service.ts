import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../models/models';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
}; 

@Injectable({ providedIn: "root" })
export class UserService {
    private apiUrl = 'http://localhost:3000/api/';
    private token = new BehaviorSubject<string | null>('');

    constructor(
        private http: HttpClient,
    ) { }

    /* User */

    login(body: any): Observable<any> {
        return this.http.post(
            this.apiUrl + "users/login",
            body)
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.token.next(localStorage.getItem('token'))
    }

    getToken() {
        return this.token.asObservable();
    }

    removeToken() {
        localStorage.removeItem('token');
        this.token.next(null);
    }
    

    
}