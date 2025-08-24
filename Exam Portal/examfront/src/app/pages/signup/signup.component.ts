import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack:MatSnackBar) {}
  ngOnInit(): void {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      //alert('user is required');
      this.snack.open("username is required !!",{
        duration : 3000
      })
      return;
    }

    //addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Success');
      },
      (error) => {
        console.log(error);
        alert('Something went wrong');
      }
    );
  }
}
