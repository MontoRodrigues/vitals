
import { IPatient } from './../interface/Ipatient.interface';
import { Injectable } from '@angular/core';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { ISugar,IBloodPressure,IOxygen,ITemperature } from '../interface/Ivital.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  userId :string="";
  patientID:string ="";


  private _patient = new Subject<IPatient>();
  patient$ = this._patient.asObservable();

  private sugarLevels = new Subject<ISugar[]>();
  sugarLevels$=this.sugarLevels.asObservable();

  private bloodPressure = new Subject<IBloodPressure[]>();
  bloodPressure$=this.bloodPressure.asObservable();

  private oxygen = new Subject<IOxygen[]>();
  oxygen$=this.oxygen.asObservable();

  private temperature = new Subject<ITemperature[]>();
  temperature$=this.temperature.asObservable();

  

  setPatientID(pid:string){
    this.patientID =pid;
    this.getPatientInfo();
  }

  getPatientSugar():void{
    this.afs.collection<ISugar>('/PatientMaster/'+ this.patientID +'/Sugar').valueChanges().subscribe( c => {
      this.sugarLevels.next(c)
      });
  }

  getPatientBloodPressure():void{
    this.afs.collection<IBloodPressure>('/PatientMaster/'+ this.patientID +'/BloodPressure').valueChanges().subscribe( c => {
      this.bloodPressure.next(c)
      });
  }

  getPatientOxygen():void{
    this.afs.collection<IOxygen>('/PatientMaster/'+ this.patientID +'/Oxygen').valueChanges().subscribe( c => {
      this.oxygen.next(c)
      });
  }

  getPatienttemperature():void{
    this.afs.collection<ITemperature>('/PatientMaster/'+ this.patientID +'/temperature').valueChanges().subscribe( c => {
      this.temperature.next(c)
      });
  }

  getPatientInfo():void{
    if(this.patientID !=="" && this.userId !==""){
      this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
        this._patient.next(p);
      });
      this.getPatientSugar();
      this.getPatientBloodPressure();
      this.getPatientOxygen();
      this.getPatienttemperature();

    }
  }

  

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    //console.log(uid);
    this.getPatientInfo();
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
