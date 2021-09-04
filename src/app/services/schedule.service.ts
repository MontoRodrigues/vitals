import { ISchedule, ISchedule_Input } from './../interface/prescription';

import { IPatient,IPrescription,IApointment } from './../interface/Ipatient.interface';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthuserService } from './authuser.service';
import { SubjectSubscriber } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  userId :string="";
  patientID:string ="";

  private _patient = new Subject<IPatient>();
  patient$ = this._patient.asObservable()

  private _scheduleList = new Subject<ISchedule[]>();
  scheduleList$ = this._scheduleList.asObservable();

  
  setPatientID(pid:string){
    this.patientID =pid;
    this.getScheduleList();
  }

  getPatientInfo():void{
    if(this.patientID !=="" && this.userId !==""){
      this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
        this._patient.next(p);
      });
    }
  }

  getScheduleList(){
    if(this.patientID !=="" && this.userId !==""){
      this.afs.collection<ISchedule>('/PatientMaster/'+ this.patientID +'/schedule').valueChanges({ idField: 'docID' }).subscribe( c => {
        this._scheduleList.next(c)
        });
    }
    this.getPatientInfo();
  }

  addSchedule(sc:ISchedule_Input){
    this.afs.collection("PatientMaster/"+this.patientID+"/schedule").add(sc);
  }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    this.getScheduleList();
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
