import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/models'
import { DialogComponent } from '../shared/dialog/dialog.component';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: any;
  toasterMessage: string = '';

  constructor(
    public matDialog: MatDialog,
    private _usersService: UsersService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    lastValueFrom(this._usersService.getUsers()).then(users => {
      this.dataSource = users;
    });

    this._usersService.getUsers().subscribe(users => {
      console.log('The usersService observable', users);
      this.dataSource = users;
    })
  }

  viewUser(user: User | null, action: string) {
    console.log('viewUser()', user);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        user,
        action
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result?.user) {
        try {
          console.log('The dialog was closed: ', result.user);
          this.dataSource.push(result.user);
          if (result.action === 'add') {
            await lastValueFrom(this._usersService.createUser(result.user));
            this.toasterMessage = 'User created succesfully';
            this.toaster.success('User created succesfully');
          } else {
            await lastValueFrom(this._usersService.updateUser(result.user, result.user.id));
            this.toasterMessage = 'User updated succesfully';
          }
          this.toaster.success(this.toasterMessage);
          await lastValueFrom(this._usersService.updateUser(result.user, result.user.id));
          lastValueFrom(this._usersService.getUsers()).then(users => {
            this.dataSource = users;
          });
        } catch (error: any) {
          console.log(error);
          switch (error.error.code) {
            case 'P2002':
              this.toaster.error('email already exists');
              break;
            default:
              this.toaster.error('Something went wrong, please review the data and try again');
              break;
          }
        }
      }
    });
  }

}
