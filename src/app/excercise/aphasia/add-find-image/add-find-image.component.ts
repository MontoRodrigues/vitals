import { FileuploadComponent } from './../../../common/components/fileupload/fileupload.component';
import { AphasiaAddImagesService } from './../../../services/aphasia-add-images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFileList } from './../../../common/components/fileupload/fileList.interface';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2'; 
import { IaphasiaAudio_input } from 'src/app/interface/aphasia.interface';

declare var MediaRecorder: any;

@Component({
  selector: 'app-add-find-image',
  templateUrl: './add-find-image.component.html',
  styleUrls: ['./add-find-image.component.css']
})
export class AddFindImageComponent implements OnInit {

  @ViewChild('fupload') fupload:FileuploadComponent | undefined;
  @ViewChild('btn') btn:any;

  imageList:IFileList[] = [];
  public ObjectName:string ="";
  public ObjectType:string ="";

  private patientID:string ="";
  public mediaRecorder:any | undefined;
  public chunks:any=[];
  public audioList:IaphasiaAudio_input[] =[];
 
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
  
 btnDisable:boolean=true;
ObjectImageList:any[]=[];
private aimg:any = null;

  constructor(private  route:ActivatedRoute,private router: Router,private sanitizer: DomSanitizer, private as: AphasiaAddImagesService) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      as.setPatientID(this.patientID);

      this.aimg =as.Objects$.subscribe(p =>{
        //console.log(p);
        this.ObjectImageList=p;
      });
   }

  public getImages(e:IFileList[]){
    this.imageList =e;
    console.log(this.imageList);
  }


  record(){
    if(this.mediaRecorder)
      this.mediaRecorder.start();
      this.btnDisable=false;
  }

  stop(){
    if(this.mediaRecorder)
      this.mediaRecorder.stop();
      this.btnDisable=true;
  }

  deleteAudio(i:number){
    this.audioList.splice(i,1);
  };

  // getaudioURL(d:any){
  //   const blob = new Blob(d.blob, { 'type' : 'audio/ogg; codecs=opus' });
  //   return (window.URL.createObjectURL(blob));
  // };
  
  // sanitizeImageUrl(imageUrl: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  // }

  public gotoRoute(p:string){
    if(this.patientID!=""){
      this.router.navigate(['/'+ p, {pid:this.patientID}]);   
    }
  }

  checkIfAudioHasAllParamaters():boolean{
    let name=0;
    let sounds_like=0;
    let half_word=0;
    for(let x=0,l=this.audioList.length;x<l;  x++){
      if(this.audioList[x].type.length==0){
        Swal.fire({  
          icon: 'error',  
          title: 'Please select Audio type',  
          showConfirmButton: true,
          toast:false,
          position:"center"
        }); 
        return false;
      }
      if(this.audioList[x].type=="Name")
        name++;
      if(this.audioList[x].type=="Sounds Like")
        sounds_like++;
      if(this.audioList[x].type=="Half word")
        half_word++;
    }

    if(name==0){
      Swal.fire({  
        icon: 'error',  
        title: 'Please add Audio for Name',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return false;
    }

    if(half_word==0){
      Swal.fire({  
        icon: 'error',  
        title: 'Please add Audio for half word',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return false;
    }

    if(sounds_like==0){
      Swal.fire({  
        icon: 'error',  
        title: 'Please add Audio for Sounds lke',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return false;
    }


    if(name>1 || sounds_like>1 || half_word>1){
      Swal.fire({  
        icon: 'error',  
        title: 'You can only add one type of audio',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return false;
    }

    if(this.audioList.length>3){
      Swal.fire({  
        icon: 'error',  
        title: 'ou can only add 3 audio types',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return false;
    }

    return true;

  };

  alertFunction(i:any,msg:any){
    Swal.fire({  
      icon: i,  
      title: msg,  
      showConfirmButton: true,
      toast:false,
      position:"center"
    }); 
    if(i=='error')
      this.btn.nativeElement.disabled = false;
  }

  public add_excercise_data(){

    this.btn.nativeElement.disabled = true;


    
    if(this.ObjectName.length==0){
      this.alertFunction('error', 'Please add Image/Object Name');
      return false;
    }

    if(this.imageList.length==0){
      this.alertFunction('error', 'Please add images atlest 1 image');
      return false;
    }

    if(!this.checkIfAudioHasAllParamaters()){
      this.btn.nativeElement.disabled = false;
      return false;
    }

    //---------add  
    this.as.add_aphasia_image(this.audioList,this.imageList,this.patientID,this.ObjectName,this.ObjectType);
    this.audioList=[];
    if(this.fupload)
      this.fupload.removeAllFiles();
    
    this.ObjectName="";
    this.btn.nativeElement.disabled = false;
    return true;
  };
 
  playAudio(d:any){
    const blob = new Blob(d.chunks, { 'type' : 'audio/mp3' });
    // const f:any = new File([blob], "foo.mp3", {
    //   type: 'audio/mp3',
    // });
    // console.log(f);
    const audioURL:any = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.audioSource=audioURL;
  }
  audioSource:any |undefined;

  ngOnInit(): void {
   
    //this.stopBtn?.nativeElement.disabled=true;
    //document.getElementById("stop").disable =true;
    if (navigator.mediaDevices) {
      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream:any) =>{
     
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.onstop = (e:any)=> {
          // const blob = new Blob(this.chunks, { 'type' : 'audio/ogg' });
          // const audioURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          //this.audioSource=audioURL;
          // console.log(this.chunks);
          this.audioList.push({id:this.generateUUID(),type:"",chunks: this.chunks});
          this.chunks = [];

          //console.log(this.audioList);
        };

        this.mediaRecorder.ondataavailable =(e:any)=> {
          this.chunks.push(e.data);
        };



       ///------canvas function start---

       let canvas = <HTMLCanvasElement>document.getElementById('visualizer');
       let audioCtx:any ;
       let canvasCtx:any;
       if(canvas!=null)
        canvasCtx = canvas.getContext("2d");

       if(!audioCtx) {
        audioCtx = new AudioContext();
      }
    
      const source = audioCtx.createMediaStreamSource(stream);
    
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
    
      source.connect(analyser);
      //analyser.connect(audioCtx.destination);
    
      draw()
    
      function draw() {
        const WIDTH = canvas.width
        const HEIGHT = canvas.height;
    
        requestAnimationFrame(draw);
    
        analyser.getByteTimeDomainData(dataArray);
    
        //background color
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
    
        canvasCtx.beginPath();
    
        let sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;
    
    
        for(let i = 0; i < bufferLength; i++) {
    
          let v = dataArray[i] / 128.0;
          let y = v * HEIGHT/2;
    
          if(i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
    
          x += sliceWidth;
        }
    
        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
    
      }

       //-------canvas function end----
      }, (err:any) =>{
        console.log('The following error occured: ' + err); 
      });
    }
  }

}
  