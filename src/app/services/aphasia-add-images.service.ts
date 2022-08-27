import { Subject } from 'rxjs';
import { AuthenticateService } from './auth/authenticate.service';
import { IFileList } from './../common/components/fileupload/fileList.interface';
import { IaphasiaAudio_input } from 'src/app/interface/aphasia.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthuserService } from './authuser.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AphasiaAddImagesService {

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

  userId :string="";
  patientID:string ="";

  private _Objects = new Subject<any[]>();
  Objects$ = this._Objects.asObservable();


  setPatientID(pid:string){
    this.patientID =pid;
    this.getaphasiaImages();
  }

  onAuthComplete (uid:string) :void{
    //console.log("reached:" + uid);
    this.userId =uid;
    this.getaphasiaImages();
  }

  getaphasiaImages():void{
    if(this.patientID !=="" && this.userId !==""){
    this.afs.collection<any>('/PatientMaster/'+ this.patientID +'/aphasia').valueChanges({ idField: 'docID' }).subscribe( c => {
      this._Objects.next(c)
      });
 
      //this.getPatientInfo();
    }
  }

  add_aphasia_image(a:any,_uploadfile:IFileList[],patientID:string,objName:string,objType:string){
    
    let id =this.generateUUID();

    let data:any={
      name:objName,
      type:objType,
      "id":id,
      image:[],
      audio:{
        name:"name.mp3",
        sounds_like:"sounds_like.mp3",
        half_word:"half_word.mp3"
      }
    };
    const filePath: string ="/aphasia/" + patientID + "/" + id+ "/";
    for(let x=0; x<_uploadfile.length;x++){
      const ref = this.storage.ref(filePath +  (x+1) +"."+ _uploadfile[x].name.split(".")[1]);
      const task = ref.put(_uploadfile[x].file);
      data.image.push((x+1) +"."+ _uploadfile[x].name.split(".")[1]);
    }

    for(let x=0;x<a.length;x++){
      
      if(a[x].chunks !=null && a[x].type=="Half word"){
        //data.audio.name="name.mp3";
        const ref = this.storage.ref(filePath +   data.audio.half_word);

        const blob = new Blob(a[x].chunks, { 'type' : 'audio/mp3' });
        const f:any = new File([blob], data.audio.half_word, {
          type: 'audio/mp3',
        });
        const task = ref.put(f);
      }
      

      if(a[x].chunks !=null && a[x].type=="Name"){
        //data.audio.name="name.mp3";
        const ref = this.storage.ref(filePath +   data.audio.name);

        const blob = new Blob(a[x].chunks, { 'type' : 'audio/mp3' });
        const f:any = new File([blob], data.audio.name, {
          type: 'audio/mp3',
        });
        const task = ref.put(f);
      }

      if(a[x].chunks !=null && a[x].type=="Sounds Like"){
        console.log(a[x]);
        //data.audio.sounds_like="sounds_like.mp3";
        const ref = this.storage.ref(filePath +   data.audio.sounds_like);

        const blob = new Blob(a[x].chunks, { 'type' : 'audio/mp3' });
        const f:any = new File([blob], data.audio.sounds_like, {
          type: 'audio/mp3',
        });
        const task = ref.put(f);
      }
    }

    this.afs.collection("PatientMaster/"+patientID+"/aphasia").add(data);
    // console.log(filePath);
    // console.log(data);

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
