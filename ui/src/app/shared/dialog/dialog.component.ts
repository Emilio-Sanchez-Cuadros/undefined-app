import {Component, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/models';

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {

  firstName: string = this.data?.user?.name?.split(' ').slice(0, -1).join(' ');
  lastName: string = this.data?.user?.name?.split(' ').slice(-1).join(' ');
  submitText: string = '';

  userForm = new FormGroup({
    firstName: new FormControl(this.firstName || '', Validators.required),
    lastName: new FormControl(this.lastName || '', Validators.required),
    email: new FormControl(this.data?.user?.email || '', Validators.required),
    password: new FormControl(this.data?.user ? '****' : '', Validators.required),
  });

  @Output()
  userValues = new EventEmitter<User>();

  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.data.action === 'add' ? this.submitText = 'Create' : this.submitText = 'Update';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    console.log('submitForm', this.userForm.value);
    let user = this.transformData(this.userForm.value);
    this.dialogRef.close({user: user, action: this.data.action });
  }

  transformData(user: any) {
    user.name = user.firstName + ' ' + user.lastName;
    if (this.data.user) {
      user.id = this.data.user.id;
    }
    delete user.firstName
    delete user.lastName
    return user;
  }
}