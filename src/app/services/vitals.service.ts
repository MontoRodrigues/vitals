import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBloodPressure_input, IOxygen_input, ISugar_input, ITemperature_input } from './../interface/Ivital.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {


  private patientId:string ="";

  setPatientId(uid:string){
    this.patientId=uid;
  }
  
  constructor(public afs: AngularFirestore) { 
   
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
}
