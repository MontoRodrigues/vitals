import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { IPatient } from './../interface/Ipatient.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadCollectionServiceService {
  userId :string="";
  patientID:string ="";

  private _collection = new Subject<any>();
  collection$ = this._collection.asObservable();

  setPatientID(pid:string){
    this.patientID =pid;
  }

  onAuthComplete (uid:string) :void{
    this.userId =uid;
  }

  public getCollection(collection:string):void{
    if(this.patientID !=="" && this.userId !==""){
      this.afs.collection<any>('/PatientMaster/'+ this.patientID +'/'+ collection).valueChanges({ idField: 'docID' }).subscribe( c => {
        this._collection.next(c)
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
