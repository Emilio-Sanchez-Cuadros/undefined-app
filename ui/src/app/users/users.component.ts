import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/models'
import { DialogComponent } from '../shared/dialog/dialog.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: any;

  constructor(
    public matDialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    lastValueFrom(this.usersService.getUsers()).then(users => {
      this.dataSource = users;
    });

    this.usersService.getUsers().subscribe(users => {
      console.log('The usersService observable', users);
      this.dataSource = users;
    })
  }

  viewUser(user: User | null, action: string) {
    console.log('viewUser', user);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        user,
        action
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result?.user) {
        let user = this.transformData(result.user);
        this.dataSource.push(user);
        console.log('The users after dialog was closed', this.dataSource);  
      }
    });
  }

  transformData(user: any) {
    user.name = user.firstName + ' ' + user.lastName;
    user.id = this.dataSource.length + 1;
    delete user.firstName
    delete user.lastName
    delete user.password
    return user;
  }

}
