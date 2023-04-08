import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/models'

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const blobHttpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/octet-stream' }),
    responseType: 'blob'
};

@Injectable({ providedIn: "root" })
export class UsersService {
    private apiUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient,
    ) { }

    /* Users */

    getUsers(): Observable<User> {
        return this.http.get(this.apiUrl + "/users", httpOptions);
    }

    getUserProfile(): Observable<User> {
        return this.http.get(this.apiUrl + "user/info", httpOptions);
    }


    // Update user data
  
}