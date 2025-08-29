import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
constructor(public login:LoginService,private router : Router){}


public logout(){
  this.login.logout();
  //window.location.reload();
  this.router.navigate(['login']);
}

}
