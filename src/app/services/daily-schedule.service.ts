import { scheduleStatusList } from './../components/daily-schedule/daily-schedule.component';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMedicine, ISchedule, IscheduleStatus, IscheduleStatus_input } from './../interface/prescription';
import { Subject } from 'rxjs';
import { IPatient } from './../interface/Ipatient.interface';
import { Injectable } from '@angular/core';
import { Interface } from 'readline';



@Injectable({
  providedIn: 'root'
})
export class DailyScheduleService {
  userId :string="";
  patientID:string ="";

  private _patient = new Subject<IPatient>();
  patient$ = this._patient.asObservable();
  
  private _scheduleStatus = new Subject<IscheduleStatus>();
  scheduleStatus$ = this._scheduleStatus.asObservable();

  private _medicineList = new Subject<IMedicine[]>();
  medicineList$ = this._medicineList.asObservable();

  private _scheduleList = new Subject<ISchedule[]>();
  scheduleList$ = this._scheduleList.asObservable();

  private  dateID():string{
    let d= new Date();
    return d.getFullYear()+"_"+(d.getMonth()+1)+"_" + d.getDate();
  }

  setPatientID(pid:string){
    this.patientID =pid;
    
    this.getPatientInfo();
  }

  getScheduleStatus(){
    this.afs.doc<IscheduleStatus>('/PatientMaster/'+ this.patientID +'/scheduleStatus/' + this.dateID()).valueChanges({ idField: 'docID' }).subscribe( c => {
        this._scheduleStatus.next(c);
      });
  }

  setScheduleStatus(ss:IscheduleStatus_input):void{
    this.afs.collection("PatientMaster/"+this.patientID+"/scheduleStatus").add(ss);
  }
  updateScheduleStatus(ss:IscheduleStatus_input,docID:string):void{
    this.afs.doc("PatientMaster/"+this.patientID+"/scheduleStatus/"+docID).set(ss);
  }

  getPatientInfo():void{
    if(this.patientID !=="" && this.userId !==""){
      this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
        this._patient.next(p);
      });
      this.getMedicineList();
      this.getScheduleList();
      this.getScheduleStatus();
    }
  }

  getMedicineList():void{
    if(this.userId !=="" && this.patientID!==""){
      let date= new Date();
      let sdate = new Date(date.getFullYear() +'-' + (date.getMonth()+1) + "-" + date.getDate());
      let edate =new Date(sdate.getTime()+ (1*24*60*60*1000));
      sdate = new Date(sdate.getTime()- (1*24*60*60*1000));
      //console.log(new Date(edate));
    this.afs.collection<IMedicine>('/PatientMaster/'+ this.patientID +'/prescriptionMedicine/',ref => ref.where('EndDate','>',edate)).valueChanges({ idField: 'docID' }).subscribe( c => {
      this._medicineList.next(c)
      });
    }
  }

  getScheduleList():void{
    if(this.patientID !=="" && this.userId !==""){
      let date= new Date();
      let sdate = new Date(date.getFullYear() +'-' + (date.getMonth()+1) + "-" + date.getDate());
      let edate =new Date(sdate.getTime()+ (1*24*60*60*1000));
      sdate = new Date(sdate.getTime()- (1*24*60*60*1000));
      //console.log(new Date(edate));
      this.afs.collection<ISchedule>('/PatientMaster/'+ this.patientID +'/schedule',ref => ref.where('EndDate','>',edate)).valueChanges({ idField: 'docID' }).subscribe( c => {
        this._scheduleList.next(c)
        });
    }
  }

  getLocalStorage():void{
    
  }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
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
