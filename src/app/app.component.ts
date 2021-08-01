import { IPatientUserMap } from './interface/Ipatient.interface';
import { AuthuserService } from './services/authuser.service';


import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  title = 'authtest';
  public patientList :IPatientUserMap[]=[];
  displayName: any = null;
  constructor(public auth: AngularFireAuth, _authService : AuthuserService, private router: Router) {
    this.auth.authState.subscribe( authState => {
      if(authState!==null) {
        // this.auth.user.subscribe(token =>{
        //   console.log(authState);
        // });
        this.displayName =authState.displayName;
        
        _authService.setUserId(authState.uid);

        //this.router.navigate(['/home']);
        //this._dataService.onAuthComplete(authState.uid);
        
        //this._PatientService.setLogin();
      }
        else
        this.login();
      //console.log(authState);
    });
  }

  login() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.displayName=null;
    this.auth.signOut();
  }

  redirectToHome(){

  }



  ngOnInit(): void {
    
  }
}
