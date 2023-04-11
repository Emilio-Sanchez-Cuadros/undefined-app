import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/models';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
}; 

@Injectable({ providedIn: "root" })
export class UsersService {
    private apiUrl = 'http://localhost:3000/api/';   

    constructor(
        private http: HttpClient,
    ) { }

    /* Users */

    getUsers(): Observable<User> {
        return this.http.get(this.apiUrl + "users");
    }

    getUserProfile(): Observable<User> {
        return this.http.get(this.apiUrl + "user/info");
    }


    createUser(user: User): Observable<any> {
        console.log('createUser() users service', user);
        return this.http.post(
            this.apiUrl + "users",
            user,
            httpOptions
        );
    }

    updateUser(user: User, userId: number): Observable<any> {
        console.log('updateUser() users service', user);
        return this.http.put(
            this.apiUrl + "users/" + userId,
            user,
            httpOptions
        );
    }
  
}