import { Platform } from '@ionic/angular';
import { Injectable, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
 
  name : '';
  password:'';

  verifyIfLogged =false;
  
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
    console.log(this.verifyIfLogged);
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.verifyIfLogged = true;
        this.authenticationState.next(true);
      }
    })
  }
 
  getCurrentUser(){
    let user = "";
    this.storage.get(TOKEN_KEY).then(res => {user = res;})
    console.log("user : "+user);

    return user;

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

  getLogin(){
    let log = '';
    this.storage.get(TOKEN_KEY).then(data => 
      {
        log = data;
      });
      console.log(log);
      return log;
  }

  requeteLogin(pUser:string,pPassword:string){
    let json = {
      user : pUser,
      password : pPassword
    }
    //header
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};

    this.http.post('http://192.168.0.158:5000/login', json,httpoption).subscribe(
      data=>{
        console.log(data);
        if(data['value'] == true){
          this.verifyIfLogged=true;
          this.storage.set(TOKEN_KEY, pUser).then(() => {
            this.authenticationState.next(true);
          });
        }
        else{
          this.authenticationState.next(false);
          this.verifyIfLogged=false;
        }
      });
  }

  login(pUser:string, pPassword:string) {

    //faire la verification de l'utilisateur
    //recuperationIdentifiants
    this.requeteLogin(pUser,pPassword);

    console.log("login : "+this.verifyIfLogged);

     
    return false;

  }
 
  logout() {
    this.verifyIfLogged = false;
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.verifyIfLogged;
  }
 
}