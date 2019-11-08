import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  currentlyLogged : boolean;
  user : '';
  password : '';
  verifLogin = true;
  constructor(private authService: AuthenticationService) { 
  }


  
  ngOnInit() {
    
  }
  onLoginKey(event) {this.user = event.target.value;}
  
  onPasswordKey(event) {this.password = event.target.value;}

    login() {
    console.log(this.user + '-'+this.password);

    if(!this.authService.login(this.user,this.password)){
      this.verifLogin = false;
    }else{
      this.verifLogin = true;
    }
    console.log(this.authService.login(this.user, this.password));
  }
 
}