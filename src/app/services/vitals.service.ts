import { IPatient } from './../interface/Ipatient.interface';
import { Subject } from 'rxjs';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBloodPressure_input, IOxygen_input, ISugar_input, ITemperature_input, IWeight_input } from './../interface/Ivital.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  userId :string="";
  private patientId:string ="";

  // private _patient = new Subject<IPatient>();
  // patient$ = this._patient.asObservable();

  setPatientId(uid:string){
    this.patientId=uid;
    //this.getPatientInfo();
  }

  // getPatientInfo():void{
  //   if(this.patientId !=="" && this.userId !==""){
  //     this.afs.doc<IPatient>('PatientMaster/'+ this.patientId).valueChanges({ idField: 'docID' }).subscribe( p => {
  //       this._patient.next(p);
  //     });
  //   }
  // }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    //this.getPatientInfo();
  }
  
  constructor(public afs: AngularFirestore,_authService : AuthuserService) { 
    if(_authService.getUserId()==""){
      _authService._userId$.subscribe(uid =>{
        this.onAuthComplete(uid);
      })
    }
    else
    this.onAuthComplete(_authService.getUserId());
  }

  add_BloodPressure(bp:IBloodPressure_input,pid:string ){
    this.afs.collection("PatientMaster/"+pid+"/BloodPressure").add(bp);
  }

  add_Oxygen(ox:IOxygen_input,pid:string ){
    this.afs.collection("PatientMaster/"+pid+"/Oxygen").add(ox);
  }

  add_Sugar(sg:ISugar_input,pid:string ){
    this.afs.collection("PatientMaster/"+pid+"/Sugar").add(sg);
  }

  add_Temperature(tmp:ITemperature_input,pid:string ){
    this.afs.collection("PatientMaster/"+pid+"/temperature").add(tmp);
  }

  add_weight(w:IWeight_input,pid:string ){
    this.afs.collection("PatientMaster/"+pid+"/weight").add(w);
  }
}
