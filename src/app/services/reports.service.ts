import { Iprescription } from './../interface/prescription';
import { Ireport, Ireport_input, IFileList } from './../interface/Ireport.interface';
import { IPatient } from './../interface/Ipatient.interface';
import { Subject } from 'rxjs';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  userId :string="";

  patientID:string ="";

  private _patient = new Subject<IPatient>();
  patient$ = this._patient.asObservable();

  private _report = new Subject<Ireport[]>();
  report$ = this._report.asObservable();

  private _prescription = new Subject<Iprescription[]>();
  prescription$ = this._prescription.asObservable();

  

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    this.getPatientInfo();
  }

  setPatientID(pid:string){
    this.patientID =pid;
    this.getPatientInfo();
  }

  //------get patient Details
  getPatientInfo():void{
      if(this.patientID !=="" && this.userId !==""){
        this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
          this._patient.next(p);
        });
        this.getReport();
        this.getPrescription()
      }
  }
  getPrescription():void{
    if(this.patientID !=="" && this.userId !==""){
    this.afs.collection<Iprescription>('/PatientMaster/'+ this.patientID +'/prescription').valueChanges({ idField: 'docID' }).subscribe( c => {
      this._prescription.next(c)
      });
    }
  }

  addReport(_report:Ireport_input,flist:IFileList[]):void{
    this.afs.collection("PatientMaster/"+this.patientID+"/report").add(_report);
  }
  deleteReport(docid:string):void{
    this.afs.doc("PatientMaster/"+this.patientID+"/report/" + docid).delete();
  }

  getReport():void{
    if(this.userId !=="" && this.patientID!==""){
      this.afs.collection<Ireport>('PatientMaster/'+ this.patientID +"/report/").valueChanges({ idField: 'docID' }).subscribe( p => {
        this._report.next(p);
      });
    }
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
