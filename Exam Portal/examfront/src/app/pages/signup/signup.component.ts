import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
      this.snack.open("username is required !!",'',{
        duration:3000,
        // verticalPosition:'top',
        // horizontalPosition:'right'
      })
      return;
    }

    //addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
       // alert('Success');
       Swal.fire('Success','User is registered and USERD-ID is : '+data.id,'success')
      },
      (error) => {
        console.log(error);
        // alert('Something went wrong');
        this.snack.open('Something went wrong','',{
          duration:3000,
        })
      }
    );
  }
}
