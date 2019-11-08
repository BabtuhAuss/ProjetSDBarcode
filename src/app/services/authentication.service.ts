import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
 
const TOKEN_KEY = 'auth-token';
const TEST_LOGIN = 'usertest';
const TEST_PASSWORD = 'test';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  name : '';
  password:'';

  verifyIfLogged =false;
  
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.verifyIfLogged = true;
        this.authenticationState.next(true);
      }
    })
  }
 
  public isLogged():boolean{
    this.verifyIfLogged = false;
    this.storage.get(TOKEN_KEY).then(result => {
      if(result){
        console.log("connecté");
        this.verifyIfLogged = true;
      }
    });
    return this.verifyIfLogged;
  }

  login(pUser:string, pPassword:string) {

    //faire la verification de l'utilisateur
    //recuperationIdentifiants
    

    
    if(pUser == TEST_LOGIN && pPassword == TEST_PASSWORD){
     this.storage.set(TOKEN_KEY, pUser).then(() => {
        this.authenticationState.next(true);
      });
      return true;
    }
    else{
      this.authenticationState.next(false);
      return false;
    }

  }
 
  logout() {
    this.verifyIfLogged = false;
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}