import { Iprescription, IMedicine, ISchedule } from './../interface/prescription';
import { Subject } from 'rxjs';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {docID} from '../constants/dailySchedule'

@Injectable({
  providedIn: 'root'
})
export class SelectScheduleServiceService {

  userId :string="";
  patientID:string ="";

  private _prescription = new Subject<Iprescription[]>();
  prescription$ = this._prescription.asObservable();

  private _medicineList = new Subject<IMedicine[]>();
  medicineList$ = this._medicineList.asObservable();

  private _scheduleList = new Subject<ISchedule[]>();
  scheduleList$ = this._scheduleList.asObservable();

  private _dailyScheduleList = new Subject<any>();
  dailyScheduleList$ = this._dailyScheduleList.asObservable();

  getData():void{
    this.getMedicineList();
    this.getPrescription();
    this.getScheduleList();
    this.getDailySchedule();
  }

  getMedicineList():void{
    if(this.userId !=="" && this.patientID!==""){
    this.afs.collection<IMedicine>('/PatientMaster/'+ this.patientID +'/prescriptionMedicine/').valueChanges({ idField: 'docID' }).subscribe( c => {
      this._medicineList.next(c);
      });
    }
  }

  getDailySchedule():void{
    if(this.userId !=="" && this.patientID!==""){
      this.afs.collection('/PatientMaster/'+ this.patientID +'/DailySchedule/').doc(docID).valueChanges({ idField: 'docID' }).subscribe( c => {
        this._dailyScheduleList.next(c);
        });
    }
  }

  updateDailySchedule(doc:any):void{
    this.afs.collection('/PatientMaster/'+ this.patientID +'/DailySchedule/').doc(docID).set(doc);
  }

  getPrescription():void{
    if(this.patientID !=="" && this.userId !==""){
    this.afs.collection<Iprescription>('/PatientMaster/'+ this.patientID +'/prescription').valueChanges({ idField: 'docID' }).subscribe( c => {
      this._prescription.next(c);
      });
    }
  }

  getScheduleList(){
    if(this.patientID !=="" && this.userId !==""){
      this.afs.collection<ISchedule>('/PatientMaster/'+ this.patientID +'/schedule').valueChanges({ idField: 'docID' }).subscribe( c => {
        this._scheduleList.next(c)
        });
    }
  }

  setPatientID(pid:string){
    this.patientID =pid;
    this.getData();
  }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    this.getData();
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
