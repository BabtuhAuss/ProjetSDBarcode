import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errorMsg = '';
  constructor(private http: HttpClient, private router: Router) {

  }

  requeteSignIn(pUser:string, pPassword:string, pNom:string, pPrenom:string){
    let json = {
      user : pUser,
      password : pPassword,
      nom : pNom,
      prenom : pPrenom
    };
    let httpoption = {headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin':'*'
    })};

    this.http.post('http://192.168.0.158:5000/register', json, httpoption).subscribe(
      data=>{
        console.log(data);
        if(data['result'] == "added"){
          this.router.navigateByUrl('/login');
        }
        else{
          this.errorMsg = data['result'];
        }
      }
    )
  }

  signIn(event : any){
    if(event.target.pPassword.value == event.target.pPassword1.value){
      this.requeteSignIn(event.target.pUser.value, event.target.pPassword.value,event.target.pNom.value,event.target.pPrenom.value)
    }
    else{
      this.errorMsg = "Les mots de passes ne correspondent pas"
    }
  }
  ngOnInit() {
  }

}
