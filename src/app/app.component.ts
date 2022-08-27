import { PatientService } from './services/patient.service';
import { IPatientUserMap } from './interface/Ipatient.interface';
import { AuthuserService } from './services/authuser.service';
import { IPatient } from './interface/Ipatient.interface';

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthenticateService } from './services/auth/authenticate.service';

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
  public imgURL:any =null;
  patient: IPatient | undefined;
  patientID:string ="";
  public routeList =[
    {name:"Patient Home", route:"patient"},
    {name:"Vitals", route:"vitals"},
    {name:"Daily Schedule", route:"dailyschedule"},
    {name:"Excercise helper", route:"excercise"},
    
    {name:"divider",route:""},
    {name:"Add prescription", route:"prescription"},
    {name:"Add Daily Schedule", route:"schedule"},
    {name:"Select Daily Schedule", route:"selectschedule"},
    {name:"divider",route:""},
    {name:"Add Reports", route:"reports"},
    {name:"Add Hospitalisation", route:"hospitalisation"},
    {name:"Download Collection", route:"download"},
  ];

  public showHideSideMenu(){
    return this.router.url != '/home';
  }

  public gotoRoute(p:string){
    if(this.patientID!=""){
      this.router.navigate(['/'+ p, {pid:this.patientID,a:this.patient?.DateOfBirth.seconds}]);     
    }
  }

  public getDOB(secs:number): number {
    var t = new Date(Date.now() - (secs * 1000));
    return (Math.abs(t.getUTCFullYear() - 1970));
  }


  constructor(public auth: AngularFireAuth, private _authService : AuthenticateService, private _auth1:AuthuserService,  private router: Router, private  route:ActivatedRoute, private ps:PatientService) {
    ps.patient$.subscribe(p =>{
      this.patient=p;
    });
    
    this.auth.authState.subscribe( authState => {
      if(authState!==null) {
        // this.auth.user.subscribe(token =>{
        //   console.log(authState);
        // });
        this.displayName =authState.displayName;
        this.imgURL =authState.photoURL;
        _auth1.setUserId(authState.uid);
        _authService.setUserId({  
          email:authState.email,
          uid: authState.uid,
          photoURL:authState.photoURL,
          displayName:authState.displayName});
       
          // console.log(authState);

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
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        if (val.state && val.state.root && val.state.root.children) {
          this.patientID =val.state.root.children[0].params.pid;
          this.ps.setPatientID(this.patientID);
        }
      }
    });

    
  }
}
