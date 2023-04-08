import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/models'
import { DialogComponent } from '../shared/dialog/dialog.component';
import { UsersService } from './users.service';

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
  users: [] = [];

  displayedColumns: string[] = ['id', 'profileImage', 'name', 'role'];
  dataSource: any;

  constructor(
    public matDialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.dataSource = this.ELEMENT_DATA;
    lastValueFrom(this.usersService.getUsers()).then(users => {
      console.log('checking users', users);
    })
  }

  viewUser(user: User) {
    console.log('viewUser', user);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
