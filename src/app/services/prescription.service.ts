import { IPatient } from './../interface/Ipatient.interface';
import { Subject } from 'rxjs';
import { Iprescription, Iprescription_input } from './../interface/prescription';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthuserService } from './authuser.service';
import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { IFileList } from '../common/components/fileupload/fileList.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  userId :string="";
  patientID:string ="";

  // private _patient = new Subject<IPatient>();
  // patient$ = this._patient.asObservable();

  private _prescription = new Subject<Iprescription[]>();
  prescription$ = this._prescription.asObservable();

  // getPatientInfo():void{
  //   if(this.patientID !=="" && this.userId !==""){
  //     this.afs.doc<IPatient>('PatientMaster/'+ this.patientID).valueChanges({ idField: 'docID' }).subscribe( p => {
  //       this._patient.next(p);
  //     });
  //   }
  // }

  setPatientID(pid:string){
    this.patientID =pid;
    this.getPrescription();
  }

  getPrescription():void{
    if(this.patientID !=="" && this.userId !==""){
    this.afs.collection<Iprescription>('/PatientMaster/'+ this.patientID +'/prescription').valueChanges({ idField: 'docID' }).subscribe( c => {
      this._prescription.next(c)
      });

      //this.getPatientInfo();
    }
  }

  addPrescription(_prescription:Iprescription_input,_uploadfile:IFileList[]):void{
    console.log(_uploadfile);
    for(var x=0; x<_uploadfile.length;x++){
      const filePath: string ="/Prescription/" + this.patientID + "/" + _uploadfile[x].name;
      const ref = this.storage.ref(filePath);
      const task = ref.put(_uploadfile[x].file);
      _prescription.imageName.push(_uploadfile[x].name);
    }
    // console.log(_prescription);
    // const filname:string=Guid.create().toString() +"."+(_uploadfile.name.substring(_uploadfile.name.lastIndexOf('.')+1, _uploadfile.name.length) || _uploadfile.name);
    // _prescription.imageName =filname;


    // const filePath: string ="/Prescription/" + this.patientID + "/" + filname;
    // const ref = this.storage.ref(filePath);
    // const task = ref.put(_uploadfile);
    this.afs.collection("PatientMaster/"+this.patientID+"/prescription").add(_prescription);
    
  }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
    this.getPrescription();
  }

  constructor(public afs: AngularFirestore, _authService : AuthuserService,private storage: AngularFireStorage) { 
    if(_authService.getUserId()==""){
      _authService._userId$.subscribe(uid =>{
        this.onAuthComplete(uid);
      })
    }
    else
    this.onAuthComplete(_authService.getUserId());
  }

}
