import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExcerciseHelperService {

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  private _excerciseList = new Subject<any[]>();
  excerciseList$ = this._excerciseList.asObservable();


  userId: string = "";
  patientID: string = "";


  setPatientID(pid: string) {
    this.patientID = pid;
    this.getExcerciseList();
  }

  onAuthComplete(uid: string): void {
    this.userId =uid;
    this.getExcerciseList();
  }

  getExcerciseList():void{
    if(this.patientID !=="" && this.userId !==""){
      this.afs.collection<any>('/PatientMaster/'+ this.patientID +'/exercise').valueChanges({ idField: 'docID' }).subscribe( c => {
        this._excerciseList.next(c)
        });
    }
  }

  addExcercise(ex: any, patientID:string): void {
    if (this.patientID != "") {

      let id = this.generateUUID();
      const filePath: string = "/exercise/" + patientID + "/" + id + "/";



      let e: any = {
        id:id,
        category: ex.category,
        description: ex.description,
        duration: ex.duration,
        name: ex.name,
        type: ex.type,
        steps: [],
        image: "intro" + "." + ex.image.file.name.split(".")[1],
        audio: "intro.mp3",
      };

      // master add audio
      let ref = this.storage.ref(filePath + e.audio);
      const blob = new Blob(ex.audio.chunks, { 'type': 'audio/mp3' });
      const f: any = new File([blob], e.audio, {
        type: 'audio/mp3',
      });
      let task = ref.put(f);

      // add master image
      ref = this.storage.ref(filePath + e.image);
      task = ref.put(ex.image.file);

      //loop through steps
      for (let x = 0; x < ex.steps.length; x++) {
        let s = {
          description: ex.steps[x].description,
          duration: ex.steps[x].duration,
          audio: this.generateUUID() + "." + "mp3",
          image: this.generateUUID() + "." + ex.steps[x].image.file.name.split(".")[1]
        };

        //----Add audio file
        ref = this.storage.ref(filePath + s.audio);
        const blob = new Blob(ex.steps[x].audio.chunks, { 'type': 'audio/mp3' });
        const f: any = new File([blob], s.audio, {
          type: 'audio/mp3',
        });
        task = ref.put(f);

        //-add images
        ref = this.storage.ref(filePath + s.image);
        task = ref.put(ex.steps[x].image.file);
  
        e.steps.push(s);
      }

      this.afs.collection("PatientMaster/" + patientID + "/exercise").add(e);
    }

  }

  constructor(public afs: AngularFirestore, _authService: AuthuserService, private storage: AngularFireStorage) {
    if (_authService.getUserId() == "") {
      _authService._userId$.subscribe(uid => {
        this.onAuthComplete(uid);
      })
    }
    else
      this.onAuthComplete(_authService.getUserId());
  }
}
