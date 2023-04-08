import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../models/models'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

ELEMENT_DATA = [
    {profileImage: '', id: 1, name: 'Juan', role: 'user'},
    {profileImage: '', id: 1, name: 'Isa', role: 'user'},
    {profileImage: '', id: 1, name: 'Emi', role: 'admin'},
  ];

  displayedColumns: string[] = ['id', 'profileImage', 'name', 'role'];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.ELEMENT_DATA;
  }

  viewUser(user: User) {
    console.log('viewUser', user);
  }

}
