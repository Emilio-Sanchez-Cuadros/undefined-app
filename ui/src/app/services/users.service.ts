import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/models'

@Injectable({ providedIn: "root" })
export class UsersService {
    private apiUrl = 'http://localhost:3000/api/';

    private httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json",  }),
    };    

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


    createUser(user: User): Observable<User> {
        console.log('createUser() users service', user);
        return this.http.post(
            this.apiUrl + "users",
            user
        );
    }

    // updateUser(id: any, update: User): Observable<User> {
    //     return this.http.put(this.authUrl + "users/" + id, update, httpOptions);
    // }

    // Update user data
  
}