import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private login: LoginService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit() {
    console.log('Login button clicked');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required!!', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required!!', '', {
        duration: 3000,
      });
      return;
    }

    //request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('SUCCESS !!!');
        console.log(data);

        //Login...
        this.login.loginUser(data.token);

        this.login.getcurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);
            //redirect ...ADMIN: admin dashboard
            //redirect ...Normal: normal dashboard
            if(this.login.getUserRole() == "ADMIN"){
              //admin dashboard
              window.location.href="/admin";
            }else if(this.login.getUserRole() == "NORMAL"){
              //normal user dashboard
              window.location.href="/user-dashboard";
            }else{
              this.login.logout();
            }
          }
        );
      },
      (error: any) => {
        console.log('ERROR !!!');
        console.log(error);
          this.snack.open("Invalid Details !!, Please try again",'',{
              duration:3000,
            })
      }
    );
  }
}
