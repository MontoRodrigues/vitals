import { IPatient } from './../interface/Ipatient.interface';
import { Subject } from 'rxjs';
import { Iprescription, IMedicine, IMedicine_input } from './../interface/prescription';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddMedicineService {

  userId :string="";
  prescriptionID:string ="";
  patientID:string ="";


  private _prescription = new Subject<Iprescription>();
  prescription$ = this._prescription.asObservable();

  // private _patient = new Subject<IPatient>();
  // patient$ = this._patient.asObservable();

  private _medicineList = new Subject<IMedicine[]>();
  medicineList$ = this._medicineList.asObservable();

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    this.getPrescription();
  }

  setPrescriptionID(pid:string,psid:string){
    this.prescriptionID =psid;
    this.patientID =pid;
    this.getPrescription();
  }

  // getPatientInfo():void{
  //   if(this.patientID !=="" && this.userId !==""){
  //     this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
  //       this._patient.next(p);
  //     });
  //   }
  // }

  getPrescription():void{
    if(this.prescriptionID !=="" && this.userId !=="" && this.patientID!==""){
      this.afs.doc<Iprescription>('PatientMaster/'+ this.patientID +"/prescription/"+ this.prescriptionID).valueChanges({ idField: 'docID' }).subscribe( p => {
        this._prescription.next(p);
      });
      //this.getPatientInfo();
      this.getMedicineList();
    }
  };

  getMedicineList():void{
    if(this.prescriptionID !=="" && this.userId !=="" && this.patientID!==""){
    this.afs.collection<IMedicine>('/PatientMaster/'+ this.patientID +'/prescriptionMedicine/',ref => ref.where('prescriptionID', '==', this.prescriptionID)).valueChanges({ idField: 'docID' }).subscribe( c => {
      this._medicineList.next(c)
      });
    }
  }

  deleteMedicine(docid:string):void{
    this.afs.doc("PatientMaster/"+this.patientID+"/prescriptionMedicine/" + docid).delete();
  }

  addMedicine(_medicine:IMedicine_input):void{
    this.afs.collection("PatientMaster/"+this.patientID+"/prescriptionMedicine").add(_medicine);
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
