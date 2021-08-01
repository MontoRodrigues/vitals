import { IPatientUserMap, IPatient_input } from './../interface/Ipatient.interface';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';

import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  userId :string="";
 
  private patientlist:IPatientUserMap[] | undefined;
  private _patientlist = new Subject<IPatientUserMap[]>();
  patientlist$ = this._patientlist.asObservable();

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    //console.log(uid);
    this.getPatientList();
  }
  getPatientList(){
    if(this.userId!=="")
    {
      this.afs.collection<IPatientUserMap>('PatientUserMap', ref => ref.where('UserId', '==', this.userId)).valueChanges().subscribe( c => {
        this._patientlist.next(c)
        });
    }
  }

addPatient(p:IPatient_input){
  let pid:string=Guid.create().toString();
  
  this.afs.collection("PatientMaster").doc(pid).set(p);
  this.afs.collection("PatientUserMap").add({Name:p.FirstName + " " +p.LastName,PatientID:pid,UserId:this.userId});
}
  constructor(public afs: AngularFirestore, _authService : AuthuserService) { 
    if(_authService.getUserId()==""){
      _authService._userId$.subscribe(uid =>{
        this.onAuthComplete(uid);
      })
    }
    else
    this.onAuthComplete(_authService.getUserId());
  }
}
